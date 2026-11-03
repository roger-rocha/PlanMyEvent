const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const z = require('zod');
const source = ts.transpileModule(fs.readFileSync('lib/api-middlewares/with-post.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
function fixture(session, count = 0) {
  const queries=[]; let reached=false;
  const db={post:{count:async q=>{queries.push(q);return count}},event:{count:async q=>{queries.push(q);return count}}};
  const context={exports:{},require(name){return {'next-auth/next':{getServerSession:async()=>session},zod:z,'@/lib/auth':{authOptions:{}},'@/lib/db':{db}}[name]}};
  vm.runInNewContext(source,context);
  return {guards:context.exports,queries,handler:()=>{reached=true},reached:()=>reached};
}
for (const [guard,key] of [['withPost','postId'],['withEvent','eventId']]) {
  test(`${guard} rejects anonymous and malformed sessions before querying`,async()=>{
    for(const session of [null,{}, {user:{}},{user:{id:''}},{user:{id:12}}]) {
      const f=fixture(session,1),res={statusCode:200,status(n){this.statusCode=n;return this},end(){return this}};
      await f.guards[guard](f.handler)({query:{[key]:'known-id'}},res);
      assert.equal(res.statusCode,401);assert.equal(f.queries.length,0);assert.equal(f.reached(),false);
    }
  });
  test(`${guard} denies other owners and allows the owner`,async()=>{
    for(const count of [0,1]) {
      const f=fixture({user:{id:'owner'}},count),res={statusCode:200,status(n){this.statusCode=n;return this},end(){return this}};
      await f.guards[guard](f.handler)({query:{[key]:'known-id'}},res);
      assert.equal(f.queries[0].where.authorId,'owner');assert.equal(f.reached(),count===1);
      assert.equal(res.statusCode,count?200:403);
    }
  });
}
