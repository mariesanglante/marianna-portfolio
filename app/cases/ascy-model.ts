export type Note = {id:string;title:string;body:string;kind:'note'|'list';checked:string[];pinned:boolean};
export const initialNotes:Note[]=[
 {id:'groceries',title:'Buy groceries',body:'Milk\nBread\nBroccoli\nBananas',kind:'list',checked:[],pinned:false},
 {id:'mom',title:'Call mom about dinner',body:'Ask about her plans for Saturday. Suggest dinner at 7 and offer to bring dessert.',kind:'note',checked:[],pinned:false},
 {id:'travel',title:'Travel checklist',body:'Passport\nTrain tickets\nPhone charger\nHeadphones',kind:'list',checked:['Passport'],pinned:false},
];
export const items=(n:Note)=>n.body.split('\n').map(s=>s.trim()).filter(Boolean);
export const complete=(n:Note)=>n.kind==='list'&&items(n).length>0&&items(n).every(i=>n.checked.includes(i));
export type Action={type:'save';note:Note}|{type:'delete';id:string}|{type:'restore';note:Note}|{type:'pin';id:string}|{type:'check';id:string;item:string}|{type:'complete';id:string}|{type:'reset'};
export function notesReducer(notes:Note[],action:Action):Note[]{
 switch(action.type){
 case 'save':return notes.some(n=>n.id===action.note.id)?notes.map(n=>n.id===action.note.id?action.note:n):[action.note,...notes];
 case 'delete':return notes.filter(n=>n.id!==action.id);
 case 'restore':return notes.some(n=>n.id===action.note.id)?notes:[action.note,...notes];
 case 'pin':return notes.map(n=>n.id===action.id?{...n,pinned:!n.pinned}:n);
 case 'check':return notes.map(n=>n.id===action.id?{...n,checked:n.checked.includes(action.item)?n.checked.filter(i=>i!==action.item):[...n.checked,action.item]}:n);
 case 'complete':return notes.map(n=>n.id===action.id?{...n,checked:complete(n)?[]:items(n)}:n);
 case 'reset':return initialNotes.map(n=>({...n,checked:[...n.checked]}));
 }
}
