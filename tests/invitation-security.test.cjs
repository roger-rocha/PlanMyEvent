const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');
const z=require('zod');
for(const filename of ['index.ts','[eventId].ts']) {
 test(`${filename} validates before writes and rejects missing events`,async()=>{
  let writes=0;let exists=false;
  const db={event:{findUnique:async()=>exists?{id:'event-id'}:null},eventParticipant:{create:async()=>{writes++;return{id:'rsvp-id'}}}};
  const ctx={exports:{},require:n=>({zod:z,'@/lib/api-middlewares/with-methods':{withMethods:(_,h)=>h},'@/lib/db':{db}}[n])};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync('pages/api/invitation/'+filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,ctx);
  async function post(body,query={eventId:'event-id'}){const res={code:200,status(n){this.code=n;return this},end(){},json(){}};await ctx.exports.default({method:'POST',body,query},res);return res.code}
  const body={eventId:'event-id',name:'Visitor',message:'Hi',status:'CONFIRMED'};
  assert.equal(await post({...body,name:'x'.repeat(201)}),422);assert.equal(writes,0);
  assert.equal(await post(body),404);assert.equal(writes,0);
  exists=true;assert.equal(await post(body),200);assert.equal(writes,1);
 });
}
