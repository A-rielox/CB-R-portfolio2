import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';
// import React, { useState } from 'react';
import { lazy, Suspense, useState } from 'react'; // 🥊
import { motion } from 'framer-motion';

import { YinYang } from './AllSvgs';
import Intro from './Intro';
import Loading from '../subComponents/Loading'; // 🥊
// import { mediaQueries } from "./Themes"; //  🥊

// import PowerButton from '../subComponents/PowerButton';
// import SocialIcons from '../subComponents/SocialIcons';
// import LogoComponent from '../subComponents/LogoComponent';
const PowerButton = lazy(() => import('../subComponents/PowerButton'));
const SocialIcons = lazy(() => import('./../subComponents/SocialIcons'));
const LogoComponent = lazy(() => import('./../subComponents/LogoComponent'));

const rotate = keyframes`
   from{
      transform: rotate(0);
   }
   to{
      transform: rotate(360deg);
   }
`;

const Main = () => {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);

   const [path, setpath] = useState(''); // 🥊

   const moveY = { y: '-100%' }; // 🥊
   const moveX = { x: `${path === 'work' ? '100%' : '-100%'}` }; // 🥊
   // work <--

   return (
      <Suspense fallback={<Loading />}>
         <MainContainer
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            /* about abajo izq, skills abajo drch */
            exit={path === 'about' || path === 'skills' ? moveY : moveX}
            transition={{ duration: 0.5 }}
         >
            <DarkDiv click={click} />

            <Container>
               <PowerButton />

               <LogoComponent theme={click ? 'dark' : 'light'} />

               <SocialIcons theme={click ? 'dark' : 'light'} />

               <Center click={click}>
                  <YinYang
                     onClick={() => handleClick()}
                     width={click ? 120 : 200}
                     height={click ? 120 : 200}
                     fill="currentColor"
                  />
                  <span>click here</span>
               </Center>

               <Contact
                  target="_blank"
                  to={{ pathname: 'mailto:arielox.ag@gmail.com' }}
               >
                  <motion.h2
                     initial={{
                        y: -200,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                     }}
                     animate={{
                        y: 0,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                     }}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                  >
                     Say Hi ✌
                  </motion.h2>
               </Contact>

               <BLOG onClick={() => setpath('blog')} to="/blog">
                  <motion.h2
                     initial={{
                        y: -200,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                     }}
                     animate={{
                        y: 0,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                     }}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                  >
                     Blog
                  </motion.h2>
               </BLOG>

               <WORK to="/work" click={click}>
                  <motion.h2
                     onClick={() => setpath('work')}
                     initial={{
                        y: -200,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                     }}
                     animate={{
                        y: 0,
                        transition: { type: 'spring', duration: 1.5, delay: 1 },
                     }}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                  >
                     Work
                  </motion.h2>
               </WORK>

               <BottomBar>
                  <ABOUT to="/about" click={click}>
                     <motion.h2
                        onClick={() => setpath('about')}
                        initial={{
                           y: 200,
                           transition: {
                              type: 'spring',
                              duration: 1.5,
                              delay: 1,
                           },
                        }}
                        animate={{
                           y: 0,
                           transition: {
                              type: 'spring',
                              duration: 1.5,
                              delay: 1,
                           },
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                     >
                        About
                     </motion.h2>
                  </ABOUT>

                  <SKILLS to="/skills">
                     <motion.h2
                        onClick={() => setpath('skills')}
                        initial={{
                           y: 200,
                           transition: {
                              type: 'spring',
                              duration: 1.5,
                              delay: 1,
                           },
                        }}
                        animate={{
                           y: 0,
                           transition: {
                              type: 'spring',
                              duration: 1.5,
                              delay: 1,
                           },
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                     >
                        Skills
                     </motion.h2>
                  </SKILLS>
               </BottomBar>
            </Container>

            {click ? <Intro click={click} /> : null}
         </MainContainer>
      </Suspense>
   );
};

export default Main;

const MainContainer = styled(motion.div)`
   background: ${props => props.theme.body};
   width: 100vw;
   height: 100vh;
   overflow: hidden;
   position: relative;

   h2,
   h3,
   h4,
   h5,
   h6 {
      font-family: 'Karla', sans-serif;
      font-weight: 500;
   }

   /* red red MEDIAQUERY red red */
`;

const Container = styled.div`
   padding: 2rem;
`;

const Contact = styled(NavLink)`
   /* color: ${props => props.theme.text}; */
   color: ${props =>
      props.click ? props.theme.body : props.theme.text}; //  🥊
   position: absolute;
   top: 2rem;
   right: calc(1rem + 2vw);
   text-decoration: none;
   z-index: 1;
`;

const BLOG = styled(NavLink)`
   /* color: ${props => props.theme.text}; */
   color: ${props =>
      props.click ? props.theme.body : props.theme.text}; //  🥊
   position: absolute;
   top: 50%;
   right: calc(1rem + 2vw);
   transform: rotate(90deg) translate(-50%, -50%);
   text-decoration: none;
   z-index: 1;

   /* @media only screen and (max-width: 50em) { */
   /* text-shadow: ${props => (props.click ? '0 0 4px #000' : 'none')}; */
   /* } */
`;

const WORK = styled(NavLink)`
   color: ${props => (props.click ? props.theme.body : props.theme.text)};
   position: absolute;
   top: 50%;
   left: calc(1rem + 2vw);
   // tiene q ir cambiado el orden de translate y rotate con el BLOG para q queden a la misma altura
   transform: translate(-50%, -50%) rotate(-90deg);
   text-decoration: none;
   z-index: 1;

   /* @media only screen and (max-width: 50em) { */
   /* text-shadow: ${props => (props.click ? '0 0 4px #000' : 'none')}; */
   /* } */
`;

const BottomBar = styled.div`
   position: absolute;
   bottom: 1rem;
   left: 0;
   right: 0;
   width: 100%;

   display: flex;
   justify-content: space-evenly;
`;

const ABOUT = styled(NavLink)`
   color: ${props => (props.click ? props.theme.body : props.theme.text)};
   text-decoration: none;
   z-index: 1;
`;
const SKILLS = styled(NavLink)`
   color: ${props => props.theme.text};
   text-decoration: none;
   z-index: 1;
`;

const Center = styled.button`
   position: absolute;
   top: ${props => (props.click ? '85%' : '50%')};
   left: ${props => (props.click ? '92%' : '50%')};
   transform: translate(-50%, -50%);
   border: none;
   outline: none;
   background-color: transparent;
   cursor: pointer;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   transition: all 1s ease;

   & > :first-child {
      animation: ${rotate} infinite 1.5s linear;
   }

   & > :last-child {
      display: ${props => (props.click ? 'none' : 'inline-block')};
      padding-top: 1rem;
   }

   /* @media only screen and (max-width: 50em) { */
   /* top: ${props => (props.click ? '90%' : '50%')}; */
   /* left: ${props => (props.click ? '90%' : '50%')}; */
   /* width: ${props => (props.click ? '80px' : '150px')}; */
   /* height: ${props => (props.click ? '80px' : '150px')}; */
   /* } */
   /* @media only screen and (max-width: 30em) { */
   /* width: ${props => (props.click ? '40px' : '150px')}; */
   /* height: ${props => (props.click ? '40px' : '150px')}; */
   /* } */
`;

//en transition esta la lista de las cosas q cambian q son width y height
const DarkDiv = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   right: 50%;
   background-color: #000;

   height: ${props => (props.click ? '100%' : '0')};
   width: ${props => (props.click ? '50%' : '0')};
   z-index: 1;
   transition: height 0.5s ease, width 1s ease 0.5s;

   // red red MEDIAQUERY red red
`;
