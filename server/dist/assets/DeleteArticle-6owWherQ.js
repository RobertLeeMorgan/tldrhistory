import{u as o,j as e,a as g,b as j,c as b,B as l,r as f,q as p,d as y}from"./index-B6wW9msG.js";function N({handleDelete:t,isPending:a}){const{deleteId:s}=o();return e.jsx("dialog",{id:`my_modal_${s}`,className:"modal z-50",children:e.jsxs("div",{className:"modal-box",children:[e.jsx("h3",{className:"font-bold text-lg",children:"Delete"}),e.jsx("p",{className:"py-4",children:"Are you sure you would like to delete this article?"}),e.jsxs("div",{className:"modal-action",children:[a?e.jsxs("button",{className:"btn",children:[e.jsx("span",{className:"loading loading-spinner"}),"Deleting"]}):e.jsx("button",{className:"btn btn-secondary",onClick:()=>t(s),children:"Delete"}),e.jsx("form",{method:"dialog",children:e.jsx("button",{className:"btn",children:"Cancel"})})]})]})})}function k(){const t=g(),{isAuth:a,logout:s}=j(),{deleteId:i}=o(),{mutate:r,isPending:c,isError:n,error:d,isSuccess:u,reset:m}=b({mutationFn:y});n&&d.message==="jwt expired"?(t("/login"),s(),l("Your session has expired, please log back in.")):n&&l.error("Delete failed, try again later."),f.useEffect(()=>{u&&(document.getElementById(`my_modal_${i}`).close(),p.invalidateQueries({queryKey:["posts"]}),l.success("Your article has been deleted!"),m())});function x(h){r({id:h,token:a.token})}return e.jsx(N,{handleDelete:x,isPending:c})}export{k as default};