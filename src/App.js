import { ThemeProvider } from 'styled-components';
import GlobalStyle from './globalStyles';
import { lightTheme, DarkTheme } from './components/Themes';
import { Switch, Route } from 'react-router-dom';

import Main from './components/Main';
import AboutPage from './components/AboutPage';
import BlogPage from './components/BlogPage';
import WorkPage from './components/WorkPage';
import MySkillsPage from './components/MySkillsPage';

/* 

svg a react-component 28.45
BlogPage 1.27.20 
Anchore.js 1.49.00
About 2.23.17
workPage 2.33.45
bigTitle 2.59.00

*/

function App() {
   return (
      <>
         <GlobalStyle />
         <ThemeProvider theme={lightTheme}>
            <Switch>
               <Route exact path="/" component={Main} />
               <Route exact path="/about" component={AboutPage} />
               <Route exact path="/blog" component={BlogPage} />
               <Route exact path="/work" component={WorkPage} />
               <Route exact path="/skills" component={MySkillsPage} />
            </Switch>
         </ThemeProvider>
      </>
   );
}

export default App;
