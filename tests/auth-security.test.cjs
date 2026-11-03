const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
function load(error=null) {
 const queries=[];
 const db={user:{findUnique:async()=>null,findFirst:async q=>{queries.push(q);return null}}};
 const deps={
  '@next-auth/prisma-adapter':{PrismaAdapter:()=>({})},
  'next-auth/providers/github':x=>x,'next-auth/providers/google':x=>x,'next-auth/providers/email':x=>x,
  '@/lib/db':{db},process:{env:{RESEND_API_KEY:'test-only'}},'@/components/emails/magicLink':()=>({}),
  resend:{Resend:class{emails={send:async()=>({error})}}},
 };
 const ctx={exports:{},process:{env:{}},require:n=>deps[n]};
 vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/auth.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,ctx);
 return {options:ctx.exports.authOptions,queries};
}
test('email-less identities cannot query an arbitrary user',async()=>{
 const {options,queries}=load();
 const token=await options.callbacks.jwt({token:{},user:{id:'signed-in-user'}});
 assert.equal(token.id,'signed-in-user');assert.equal(queries.length,0);
});
test('mail provider failures propagate to authentication',async()=>{
 const {options}=load({message:'rejected'});
 await assert.rejects(options.providers[2].sendVerificationRequest({identifier:'test@example.com',url:'https://example.com/callback',provider:{}}),/Unable to send verification email/);
});
test('successful mail delivery completes authentication callback',async()=>{
 const {options}=load();
 await options.providers[2].sendVerificationRequest({identifier:'test@example.com',url:'https://example.com/callback',provider:{}});
});
