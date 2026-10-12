// Optional development validator; not required for everyday Spectodo use.
export function validateInventory(source, path, options={}) {
  const errors=[], lines=source.replace(/\n$/,"").split("\n");
  const sections=[],versionIds=new Set(), categoryIds=new Set(), recordIds=new Set(),refs=[];
  let section="",category="", categoryItems=0,scopeId=null,scopeRoot=null,scopeCount=0,versionCount=0,categoryCount=0,scopeDecl=0;
  function error(n,msg){errors.push(`${path}:${n}: ${msg}`);}
  function flushCat(n){if(section==="category" && categoryItems===0)error(n,"category has no items");}
  function escapedTextValid(s){if(!s.trim())return false;for(let i=0;i<s.length;i++){if(s[i]==="|")return false;if(s[i]==="\\"){if(i+1>=s.length||!["|","\\"].includes(s[i+1]))return false;i++;}}return true;}
  for(let j=0;j<lines.length;j++){
    const line=lines[j], n=j+1;
    if(!line.trim()){
      const next=lines.slice(j+1).find(t=>t.trim())||"";
      if(section==="scope" && scopeDecl===0)error(n,"blank before scope declaration");
      if(section==="versions" && /^- V\d+:/.test(next))error(n,"blank within version declarations");
      if(section==="constraints" && /^- [A-Z][A-Z0-9-]*-\d{3} /.test(next))error(n,"blank within constraints");
      if(section==="category" && next.startsWith("- ["))error(n,"blank within category records");
      continue;
    }
    if(line==="# Scope"){flushCat(n);sections.push("scope");section="scope";category="";scopeCount++;continue;}
    if(line==="# Versions"){flushCat(n);sections.push("versions");section="versions";category="";continue;}
    if(line==="# Constraints"){flushCat(n);sections.push("constraints");section="constraints";category="";continue;}
    if(line.startsWith("## ")){
      flushCat(n);const m=line.match(/^## ([A-Z][A-Z0-9-]*): (.+)$/);
      if(!m){error(n,"invalid category heading");continue;}
      if(categoryIds.has(m[1]))error(n,"duplicate category ID");
      categoryIds.add(m[1]);sections.push("category");section="category";category=m[1];categoryItems=0;categoryCount++;continue;
    }
    if(line.startsWith("#")){error(n,"unknown heading");continue;}
    if(section==="scope"){
      const m=line.match(/^- ([A-Z][A-Z0-9-]*): (\.|[^\\/\s]+(?:\/[^\\/\s]+)*\/)$/);
      if(!m){error(n,"invalid scope declaration");continue;}
      scopeDecl++;scopeId=m[1];scopeRoot=m[2];
      if(scopeRoot!=="."){
        const segs=scopeRoot.slice(0,-1).split("/");
        if(segs.some(s=>s==="."||s===".."||!s))error(n,"unsafe scope root");
      }
      continue;
    }
    if(section==="versions"){
      const m=line.match(/^- (V\d+): (.+)$/);
      if(!m){error(n,"invalid version declaration");continue;}
      if(versionIds.has(m[1]))error(n,"duplicate version");versionIds.add(m[1]);versionCount++;continue;
    }
    if(section==="constraints"){
      const m=line.match(/^- ([A-Z][A-Z0-9-]*-\d{3}) (.+)$/);
      if(!m){error(n,"invalid constraint");continue;}
      if(recordIds.has(m[1]))error(n,"duplicate ID");recordIds.add(m[1]);
      if(/(?:\| D:|\[V\d+\]|\[P\d+\]|\[[ x]\])/.test(m[2]))error(n,"progress metadata in constraint");
      continue;
    }
    if(section==="category"){
      const parts=line.split(" | ");
      const m=parts[0].match(/^- \[([ x])\] ([A-Z][A-Z0-9-]*-\d{3}) \[(V\d+)\] \[(P[1-9]\d*)\] (.+)$/);
      if(!m){error(n,"malformed item core");continue;}
      categoryItems++;
      const [,overall,id,version,,statement]=m;
      if(!id.startsWith(category+"-"))error(n,"item ID prefix does not match category");
      if(recordIds.has(id))error(n,"duplicate ID");recordIds.add(id);
      if(!escapedTextValid(statement))error(n,"empty or incorrectly escaped statement");
      if(!parts[1]||!/^D:[x~>.-] I:[x~>.-] P:[x~>.-] V:[x~>.-]$/.test(parts[1])){error(n,"invalid axes");continue;}
      if(!versionIds.has(version))error(n,"unknown target version");
      const st=parts[1].match(/[x~>.-]/g); // statuses only
      const axes=parts[1].match(/[DIPV]:([x~>.-])/g).map(t=>t.slice(2));
      const allDone=axes.every(s=>s==="x"||s==="-");
      if((overall==="x")!==allDone)error(n,"checkbox does not match axes");
      let k=2,hasGap=false;
      if(parts[k]?.startsWith("!")){
        hasGap=true;
        if(!escapedTextValid(parts[k].slice(1)))error(n,"invalid gap");
        k++;
      }
      if(axes.includes("~")&&!hasGap)error(n,"partial without gap");
      if(parts[k]!==undefined){
        if(!/^@\S+(?: @\S+)*$/.test(parts[k]))error(n,"invalid reference or misplaced segment");
        else for(const ref of parts[k].split(" ")){
          const refpath=ref.slice(1);refs.push(refpath);
          if(options.knownPaths && !/^https?:\/\//.test(refpath) && !options.knownPaths.has(refpath))error(n,"missing reference "+refpath);
        }
        k++;
      }
      if(k!==parts.length)error(n,"unknown extra segment");
      continue;
    }
    error(n,"content outside declared section");
  }
  flushCat(lines.length);
  if(scopeCount!==1||scopeDecl!==1||sections[0]!=="scope")error(1,"requires one leading scope");
  if(sections[1]!=="versions"||sections.filter(x=>x==="versions").length!==1||versionCount===0)error(1,"requires one Versions section");
  if(sections.filter(x=>x==="constraints").length>1)error(1,"duplicate Constraints section");
  if(categoryCount===0 || sections.slice(2).some((x,i,a)=>x!=="category" && (x!=="constraints"||i!==0)))error(1,"invalid section order or missing categories");
  if(scopeRoot){
    const expected=scopeRoot==="."?"SPECTODO.md":scopeRoot+"SPECTODO.md";
    if(path!==expected)error(1,"scope root does not match canonical path "+expected);
  }
  return {errors,scopeId,scopeRoot,itemCount:[...recordIds].filter(x=>x.match(/\d{3}$/)).length,refs};
}

export function validateRepository(candidates,routes,supportedRoots=[]){
  const errors=[], ids=new Set(),roots=new Set(),paths=new Set(),byPath=new Map();
  for(const c of candidates){
    if(paths.has(c.path))errors.push("duplicate canonical inventory path "+c.path);
    paths.add(c.path);byPath.set(c.path,c);
    if(c.legacy){
      if(c.path!=="SPECTODO.md")errors.push("legacy inventory must be repository root");
      if(c.source.startsWith("# Scope"))errors.push("legacy file unexpectedly scoped");
      continue;
    }
    const v=validateInventory(c.source,c.path);
    errors.push(...v.errors);
    if(ids.has(v.scopeId))errors.push("duplicate scope ID "+v.scopeId);
    if(roots.has(v.scopeRoot))errors.push("duplicate scope root "+v.scopeRoot);
    ids.add(v.scopeId);roots.add(v.scopeRoot);
  }
  for(const root of supportedRoots){
    const hit=routes.filter(r=>r.workspace===root);
    if(hit.length!==1)errors.push("workspace does not have exactly one route: "+root);
    if(hit.length===1&&!byPath.has(hit[0].inventory))errors.push("route points to missing inventory: "+root);
  }
  for(const c of candidates)if(!routes.some(r=>r.inventory===c.path))errors.push("canonical inventory has no route: "+c.path);
  for(const r of routes)if(!supportedRoots.includes(r.workspace))errors.push("route for unsupported workspace: "+r.workspace);
  return errors;
}
