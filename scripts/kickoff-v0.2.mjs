// Optional reusable file-operation core for Spectodo's Agent Skill.
// It never claims to infer product requirements or verify semantic correctness.
import {existsSync,readFileSync,writeFileSync,mkdirSync,readdirSync,lstatSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {validateInventory,validateRepository} from './validate-v0.2.mjs';
const START='<!-- BEGIN SPECTODO ROUTING -->';
const END='<!-- END SPECTODO ROUTING -->';
const INDEX='docs/spectodo-source-inventory.md';
const LEDGER='docs/spectodo-migration-ledger.md';
function safe(p) {
  if(typeof p!=='string'||!p||p.startsWith('/')||p.includes('\\')||p.split('/').some(x=>!x||x==='.'||x==='..'))throw Error('Unsafe path: '+p);
  return p;
}
function get(root,p){return readFileSync(join(root,safe(p)),'utf8');}
function exists(root,p){return existsSync(join(root,safe(p)));}
function all(root,rel=''){
  return readdirSync(rel?join(root,rel):root,{withFileTypes:true}).flatMap(e=>{
    if(['.git','node_modules','.cache'].includes(e.name))return [];
    const p=rel?rel+'/'+e.name:e.name,st=lstatSync(join(root,p));
    return st.isSymbolicLink()?[]:st.isDirectory()?all(root,p):[p];
  }).sort();
}
function put(root,p,value,changes){
  safe(p);
  if(exists(root,p)&&get(root,p)===value)return;
  mkdirSync(dirname(join(root,p)),{recursive:true});
  writeFileSync(join(root,p),value);changes.push(p);
}
function sourceIndex(paths){
  return '# Source index\n\n'+paths.filter(p=>!['SPECTODO.md',INDEX,LEDGER].includes(p)&&!p.endsWith('/SPECTODO.md')).map(p=>'- '+p).join('\n')+'\n';
}
function routing(before,routes){
  const body=START+'\n'+routes.map(r=>'Active workspace root '+r.workspace+' maps to '+r.inventory+' (scope '+r.scope+').').join('\n')+'\n'+END;
  const i=before.indexOf(START),j=before.indexOf(END);
  if((i>=0)!==(j>=0)||(i>=0&&(before.indexOf(START,i+1)>=0||before.indexOf(END,j+1)>=0)))throw Error('Conflicting route markers');
  if(i<0)return before.trimEnd()+'\n\n'+body+'\n';
  return before.slice(0,i)+body+before.slice(j+END.length);
}
function ledger(old){
  const lines=old.split('\n');
  const versions=lines.filter(x=>/^- V\d+: /.test(x));
  const constraints=lines.filter(x=>/^- [A-Z][A-Z0-9-]*-\d{3} /.test(x));
  const items=lines.filter(x=>/^- \[[ x]\] [A-Z][A-Z0-9-]*-\d{3} /.test(x));
  if(!versions.length||!items.length)throw Error('Legacy source requires manual audit');
  const refs=[...new Set((old.match(/@[^\s]+/g)||[]).map(x=>x.slice(1)))].sort();
  const rows=[...versions.map(x=>['version',x]),...constraints.map(x=>['constraint',x]),...items.map(x=>['item',x]),...refs.map(x=>['reference',x])];
  return '# Explicit one-to-one migration ledger\n\n'+rows.map(([k,v])=>'- '+k+' preserved at root: '+v).join('\n')+'\n\nRoute: implicit . -> SPECTODO.md becomes explicit . -> SPECTODO.md.\n';
}
// Inventories are supplied by an agent AFTER evidence and semantic review.
export function applyKickoff({root,inventories,routes,migration=false}){
  if(!root||!existsSync(root)||!Array.isArray(routes)||!routes.length)throw Error('Missing root or routes');
  if(!inventories||!Object.keys(inventories).length)throw Error('Missing candidate inventories');
  const prepared=Object.entries(inventories).map(([path,source])=>({path:safe(path),source}));
  for(const x of prepared)if(!x.path.endsWith('SPECTODO.md'))throw Error('Bad inventory path');
  const normalized=routes.map(r=>{if(r.workspace!=='.')safe(r.workspace.replace(/\/$/,''));return {...r,inventory:safe(r.inventory)};});
  for(const route of normalized)if(!prepared.some(x=>x.path===route.inventory))throw Error('Unknown inventory in routing');
  const known=new Set([...all(root),...prepared.map(x=>x.path),INDEX,LEDGER,'AGENTS.md']);
  const ledgers=[];
  for(const x of prepared){
    const old=exists(root,x.path)?get(root,x.path):null;
    const parsed=validateInventory(x.source,x.path,{knownPaths:known});
    if(parsed.errors.length)throw Error(parsed.errors.join('\n'));
    if(old?.startsWith('# Versions\n')){
      if(!migration)throw Error('Legacy migration requires explicit authorization');
      if(x.source!=='# Scope\n- '+parsed.scopeId+': .\n\n'+old)throw Error('Legacy migration must preserve every source line');
      ledgers.push(ledger(old));
    }else if(old!==null&&old!==x.source){
      throw Error('Existing v0.2 inventory differs; reconcile by ID before rerun: '+x.path);
    }
    if(!normalized.some(r=>r.inventory===x.path&&r.scope===parsed.scopeId))throw Error('Mismatched scope route');
  }
  const errs=validateRepository(prepared,normalized,normalized.map(r=>r.workspace));
  if(errs.length)throw Error(errs.join('\n'));
  const prior=exists(root,'AGENTS.md')?get(root,'AGENTS.md'):'# Agent instructions\n';
  const agent=routing(prior,normalized);
  const census=sourceIndex([...new Set([...all(root),...prepared.map(x=>x.path)])].sort());
  const changes=[];
  for(const x of prepared)put(root,x.path,x.source,changes);
  for(const l of ledgers)put(root,LEDGER,l,changes);
  put(root,'AGENTS.md',agent,changes);
  put(root,INDEX,census,changes);
  return {changes,filesIndexed:census.split('\n').filter(x=>x.startsWith('- ')).length};
}
export function reconcileItem({root,path='SPECTODO.md',id,before,after}){
  const lines=get(root,path).split('\n');
  const n=lines.findIndex(x=>x.startsWith('- [')&&x.includes(' '+id+' '));
  if(n<0||lines[n]!==before||!after.includes(' '+id+' '))throw Error('Item identity or previous state mismatch');
  lines[n]=after;
  const next=lines.join('\n'),parsed=validateInventory(next,path,{knownPaths:new Set(all(root))});
  if(parsed.errors.length)throw Error(parsed.errors.join('\n'));
  const changes=[];
  put(root,path,next,changes);
  return {changes};
}
