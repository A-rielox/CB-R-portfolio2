import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { Blogs } from '../data/BlogData';
import img from '../assets/Images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg';
import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import BlogComponent from './BlogComponent';
import AnchorComponent from '../subComponents/Anchor';
import BigTitle from '../subComponents/BigTitle';

// Framer-motion config
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

const BlogPage = () => {
   const [numbers, setNumbers] = useState(0);

   useEffect(() => {
      // el 30 es xq es un poco mas de la altura del eslabon en Anchore.js <Link >, asi NO llega hasta abajo, con 25 ( la altura de un eslabon ) llega justo hasta abajo
      let num = (window.innerHeight - 70) / 25;
      setNumbers(parseInt(num));
   }, []);

   return (
      <MainContainer
         variants={container}
         initial="hidden"
         animate="show"
         exit={{
            opacity: 0,
            transition: { duration: 0.5 },
         }}
      >
         <Container>
            <LogoComponent />
            <PowerButton />
            <SocialIcons />

            <AnchorComponent number={numbers} />

            <Center>
               <Grid>
                  {Blogs.map(blog => {
                     return <BlogComponent key={blog.id} blog={blog} />;
                  })}
               </Grid>
            </Center>

            <BigTitle text="BLOG" top="5rem" left="5rem" />
         </Container>
      </MainContainer>
   );
};

export default BlogPage;

// buena como le pone la imagen de fondo
const MainContainer = styled(motion.div)`
   background-image: url(${img});
   background-size: cover;
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-position: center;
`;

const Container = styled.div`
   background-color: ${props => `rgba(${props.theme.bodyRgba},0.8)`};
   width: 100%;
   /* height: auto; */
   min-height: calc(100vh - 5rem);

   position: relative;
   padding-bottom: 5rem;
`;

const Center = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   padding-top: 10rem;
`;

const Grid = styled.div`
   display: grid;
   grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));
   grid-gap: calc(1rem + 2vw);
`;
