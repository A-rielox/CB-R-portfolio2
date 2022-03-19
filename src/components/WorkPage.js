import { motion } from 'framer-motion';
import { useEffect, useRef, lazy, Suspense } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { YinYang } from './AllSvgs';
import { Work } from '../data/WorkData';
import { DarkTheme, mediaQueries } from './Themes';

import Card from '../subComponents/Card';
import Loading from '../subComponents/Loading';

const SocialIcons = lazy(() => import('../subComponents/SocialIcons'));
const PowerButton = lazy(() => import('../subComponents/PowerButton'));
const LogoComponent = lazy(() => import('../subComponents/LogoComponent'));
const BigTitle = lazy(() => import('../subComponents/BigTitle'));

// Framer motion configuration
const container = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,

      transition: {
         staggerChildren: 0.5,
         duration: 0.5,
      },
   },
};

const WorkPage = () => {
   const ref = useRef(null);
   const yinyang = useRef(null);

   useEffect(() => {
      let element = ref.current;

      const rotate = () => {
         element.style.transform = `translateX(${-window.pageYOffset}px)`;

         if (yinyang.current) {
            // en el inline se ve "style='transform: rotate(-572.675deg);'"
            return (yinyang.current.style.transform =
               'rotate(' + -window.pageYOffset + 'deg)');
         } else {
            return;
         }
      };

      window.addEventListener('scroll', rotate);

      return () => {
         window.removeEventListener('scroll', rotate);
      };
   }, []);

   return (
      <ThemeProvider theme={DarkTheme}>
         <Suspense fallback={<Loading />}>
            <Box
               key="work"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1, transition: { duration: 1 } }}
               exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
               <LogoComponent theme="dark" />
               <SocialIcons theme="dark" />
               <PowerButton />

               <Main
                  ref={ref}
                  variants={container}
                  initial="hidden"
                  animate="show"
               >
                  {Work.map(d => (
                     <Card key={d.id} data={d} />
                  ))}
               </Main>

               <Rotate ref={yinyang}>
                  <YinYang width={80} height={80} fill={DarkTheme.text} />
               </Rotate>

               <BigTitle text="WORK" top="10%" right="20%" />
            </Box>
         </Suspense>
      </ThemeProvider>
   );
};

export default WorkPage;

const Box = styled(motion.div)`
   background-color: ${props => props.theme.body};
   height: 400vh;
   position: relative;
   display: flex;
   align-items: center;
`;

const Main = styled(motion.ul)`
   position: fixed;
   top: 12rem;
   left: calc(10rem + 15vw);
   height: 40vh;
   display: flex;

   ${mediaQueries(50)`
   left: calc(8rem + 15vw);`};

   ${mediaQueries(40)`
   top: 30%;
   left: calc(6rem + 15vw);`};

   ${mediaQueries(40)`
   left: calc(2rem + 15vw);`};

   ${mediaQueries(25)`
   left: calc(1rem + 15vw);`};
`;

const Rotate = styled.span`
   display: block;
   position: fixed;
   right: 1rem;
   bottom: 1rem;
   width: 80px;
   height: 80px;
   z-index: 1;

   ${mediaQueries(40)`
   width:60px;
   height:60px;
   svg{
      width:60px;
      height:60px;
      }`};

   ${mediaQueries(25)`
   width:50px;
   height:50px;
   svg{
      width:50px;
      height:50px;
      }`};
`;
// 40 ems 640
// 25 ems 400
