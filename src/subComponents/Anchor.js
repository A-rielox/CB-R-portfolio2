import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Anchor, Link } from '../components/AllSvgs';

const AnchorComponent = props => {
   const ref = useRef(null);
   const hiddenRef = useRef(null);

   useEffect(() => {
      const handleScroll = () => {
         //la distancia q se a "scroleado"
         let scrollPosition = window.pageYOffset;
         // la altura de mi ventana
         let windowSize = window.innerHeight;
         // la altura de todo el documento
         let bodyHeight = document.body.offsetHeight;

         // Math.max() returns the number with the highest value.
         // diff es lo q queda por ver de la pagina
         let diff = Math.max(bodyHeight - (scrollPosition + windowSize));
         //diff*100/scrollposition
         // es el porcentaje respecto al ( documento - una pantalla )
         let diffP = (diff * 100) / (bodyHeight - windowSize);

         // ⭐ devuelve a la vista la cadena
         ref.current.style.transform = `translateY(${-diffP}%)`;

         if (window.pageYOffset > 5) {
            hiddenRef.current.style.display = 'none';
         } else {
            hiddenRef.current.style.display = 'block';
         }
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // crea un elemento en el array xcada numero q se pase
   return (
      <Container>
         <PreDisplay ref={hiddenRef} className="hidden">
            <Anchor width={70} height={70} fill="currentColor" />
         </PreDisplay>

         <Slider ref={ref}>
            {[...Array(props.number)].map((x, id) => {
               return (
                  <Link
                     key={id}
                     width={25}
                     height={25}
                     fill="currentColor"
                     className="chain"
                  />
               );
            })}

            <Anchor width={70} height={70} fill="currentColor" />
         </Slider>
      </Container>
   );
};

export default AnchorComponent;

const Container = styled.div`
   position: relative;
`;

const Slider = styled.div`
   position: fixed;
   top: 0;
   right: 2rem;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;

   // ⭐ esconde la cadena inicialmente, con el useEffect se va devolviendo a la vista en base a lo "escroleado"
   transform: translateY(-100%);

   .chain {
      transform: rotate(135deg);
   }
`;

const PreDisplay = styled.div`
   position: absolute;
   top: 0;
   right: 2rem;
`;
