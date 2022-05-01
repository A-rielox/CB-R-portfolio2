import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react'; // 🥊
import GlobalStyle from './globalStyles';
import { ThemeProvider } from 'styled-components';
import { lightTheme, DarkTheme } from './components/Themes';
import Loading from './subComponents/Loading'; // 🥊

const Main = lazy(() => import('./components/Main'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const MySkillsPage = lazy(() => import('./components/MySkillsPage'));
const BlogPage = lazy(() => import('./components/BlogPage'));
const WorkPage = lazy(() => import('./components/WorkPage'));
const SoundBar = lazy(() => import('./subComponents/SoundBar'));
/* 
Main 20.40
   svg a react-component 28.45
   37.20 social icons
   44.10 contact
   46.30 blog link
   50.10 bottom bar
   53.30 logo centro
   1.01.40 dark div
   1.10.20 recuadro central
BlogPage 1.27.20 
   Anchore.js 1.49.00
MySkills 2.04.10
About 2.23.17
workPage 2.33.45
bigTitle 2.59.00

*/

function App() {
   const location = useLocation();

   return (
      <>
         <GlobalStyle />

         <ThemeProvider theme={lightTheme}>
            <Suspense fallback={<Loading />}>
               {/* 🥊 */}
               <SoundBar />

               <AnimatePresence exitBeforeEnter>
                  <Switch location={location} key={location.pathname}>
                     <Route exact path="/" component={Main} />
                     <Route exact path="/about" component={AboutPage} />
                     <Route exact path="/blog" component={BlogPage} />
                     <Route exact path="/work" component={WorkPage} />
                     <Route exact path="/skills" component={MySkillsPage} />
                  </Switch>
               </AnimatePresence>
            </Suspense>
         </ThemeProvider>
      </>
   );
}

export default App;

// location={location} key={location.pathname} lo necesito junto con el animate presence, sino NO se anima la salida

// useLocation
// The useLocation hook returns the location object that represents the current URL. You can think about it like a useState that returns a new location whenever the URL changes.This could be really useful e.g. in a situation where you would like to trigger a new “page view” event using your web analytics tool whenever a new page loads, as in the following example:
