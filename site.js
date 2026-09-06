"use strict";
const search = document.querySelector('#search');
const category = document.querySelector('#category');
const quality = document.querySelector('#quality');
const results = document.querySelector('#results');
let records = [];
function node(tag, text, className) { const n = document.createElement(tag); n.textContent = text; if (className) n.className = className; return n; }
async function copy(text) {
  try { await navigator.clipboard.writeText(text); document.querySelector('#copy-status').textContent = 'Copied to clipboard.'; }
  catch { const field = document.querySelector('#copy-text'); field.value = text; document.querySelector('#copy-dialog').showModal(); field.focus(); field.select(); }
}
function render() {
 const query = search.value.trim().toLowerCase();
 const filtered = records.filter(d => d.device.toLowerCase().includes(query) && (category.value === 'all' || d.category === category.value) && (quality.value === 'all' || d.status === quality.value));
 results.replaceChildren(); document.querySelector('#count').textContent = `${filtered.length} of ${records.length} devices`;
 if (!filtered.length) results.append(node('p', 'No devices match. Try another name or clear your filters.'));
 for (const d of filtered) {
  const card = node('article', '', 'card');
  card.append(node('span', d.status === 'source-checked' ? 'Source checked' : 'Needs review', d.status === 'source-checked' ? 'badge checked' : 'badge'), node('h2', d.device), node('p', `${d.width} × ${d.height}`, 'dimensions'), node('p', `DPR ${d.dpr} · ${d.category} · ${d.dimension_type}`, 'meta'));
  const actions = node('div', '', 'actions'); const settings = node('button', 'Copy settings'); settings.type='button'; settings.setAttribute('aria-label', `Copy settings for ${d.device}`);
  settings.addEventListener('click', () => copy(`${d.device}\nWidth: ${d.width}\nHeight: ${d.height}\nDPR: ${d.dpr}\nDimensions: ${d.dimension_type}\nStatus: ${d.status}${d.user_agent !== '-' ? '\nUser agent: ' + d.user_agent : ''}`)); actions.append(settings);
  if (d.user_agent && d.user_agent !== '-') { const ua = node('button', 'Copy user agent'); ua.type='button'; ua.addEventListener('click', () => copy(d.user_agent)); actions.append(ua); }
  const detail = node('details', ''); detail.append(node('summary','Source & measurement notes'),node('p',d.notes));
  if (d.source) { const link=node('a','View source'); link.href=d.source; detail.append(link,node('p',`Last source check: ${d.last_verified}`)); } else detail.append(node('p','Original source and verification date are unknown.'));
  if(d.user_agent !== '-') detail.append(node('p',d.user_agent));
  card.append(detail,actions); results.append(card);
 }
 return filtered;
}
for (const input of [search,category,quality]) input.addEventListener('input',render);
async function load() {
 try { const response=await fetch('device.json'); if(!response.ok) throw Error('Data unavailable'); const data=await response.json(); records=Object.entries(data).flatMap(([category,items])=>items.map(d=>({...d,category}))); render(); }
 catch { document.querySelector('#count').textContent='Could not load devices. Check your connection and retry.'; const retry=node('button','Retry'); retry.addEventListener('click',()=>{results.replaceChildren();load();}); results.replaceChildren(retry); }
}
load();
if(document.modelContext?.registerTool) {
 const lifecycle=new AbortController(); window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
 try { Promise.resolve(document.modelContext.registerTool({name:'search_devices',description:'Filter the visible device catalogue by name and return matching presets.',inputSchema:{type:'object',properties:{query:{type:'string'}},required:['query'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute(input){if(!input || typeof input.query!=='string')throw Error('query must be a string');search.value=input.query;category.value='all';quality.value='all';return render();}},{signal:lifecycle.signal})).catch(()=>{}); } catch {}
}
