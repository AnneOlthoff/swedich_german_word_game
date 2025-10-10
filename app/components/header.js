'use client'; 

import { usePathname, useRouter } from 'next/navigation';

import Link from "next/link";


export default function Header() {
  
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = (e) => {
    e.preventDefault();
    if (pathname === '/') {
      // Scrolla till sektionen om vi är på startsidan
      document.querySelector('#my-work').scrollIntoView({ behavior: 'smooth'});
    } else {
      // Navigera till startsidan först
      router.push('/#my-work');
    }
  };
  
    return (
      <header style={styles.header}>
       
          <h3>
            <strong>
             Swedish to German word game
            </strong>
          </h3>
          
       
       
      </header>
    );
  }
  
  const styles = {
    header: {
      position: 'sticky',
      
      
      justifyContent: 'space-between', 
      alignItems: 'center', 
      textAlign: 'center',
      
      paddingTop: '16px',
      paddingBottom: '16px',
      
      backgroundColor: 'var(--background-secondary)',
      borderBottom: '1px solid var(--divider-color)',
      
    
    },
    
    
   
  };