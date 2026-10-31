// 사파리(아이폰)용 보충: 사파리는 ReadableStream을 for await로 못 돌려서 pdf.js 글자 읽기가 멈춤 → 직접 채워 넣음
const RS=globalThis.ReadableStream;
if(RS&&!RS.prototype[Symbol.asyncIterator]){
  const values=function(opt){
    const preventCancel=!!(opt&&opt.preventCancel), reader=this.getReader();
    return {
      next(){ return reader.read(); },
      return(v){ const done={done:true,value:v};
        if(preventCancel){ reader.releaseLock(); return Promise.resolve(done); }
        const p=reader.cancel(v); reader.releaseLock(); return p.then(()=>done); },
      [Symbol.asyncIterator](){ return this; }
    };
  };
  Object.defineProperty(RS.prototype,"values",{value:values,writable:true,configurable:true});
  Object.defineProperty(RS.prototype,Symbol.asyncIterator,{value:values,writable:true,configurable:true});
}
if(!Promise.withResolvers) Promise.withResolvers=function(){ let a,b; const p=new Promise((x,y)=>{a=x;b=y;}); return {promise:p,resolve:a,reject:b}; };
export {};
