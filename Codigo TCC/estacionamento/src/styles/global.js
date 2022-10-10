import {createGlobalStyle} from "styled-components";

const Global = createGlobalStyle `

*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: 'Josefin Sans', sans-serif;
}


html,
body,
#root {
background-color: #191B1A;
color: white;
display: flex;
}

.navBody{
  height: 100vh;
}

ul {
  list-style: none;
}
`;  

export default Global;







