import{b as l,u as c,a as k,c as d,r as f,B as o,l as g,q as p}from"./index-B6wW9msG.js";function x(){const{isAuth:t,logout:r}=l(),{likeId:e,setLikeId:s}=c(),n=k(),{mutate:a,isError:i,error:u}=d({mutationFn:g,onSuccess:()=>{p.invalidateQueries({queryKey:["posts"]})}});f.useEffect(()=>{e&&(a({id:e,token:t.token}),s(null))},[e,t.token,a,s]),i&&u.message==="jwt expired"?(r(),o("Your session has expired, please log in again."),n("/login")):i&&o.error("Failed to like article, please try again later.")}export{x as default};