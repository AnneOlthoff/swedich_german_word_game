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
       
          <div style={styles.links}>
            Swedich to German word game
          </div>
          
       
       
      </header>
    );
  }
  
  const styles = {
    header: {
      position: 'sticky',
      top: '0px',
      display: 'flex',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      paddingLeft: '24px',
      paddingTop: '32px',
      paddingBottom: '8px',
      
      paddingRight: '20px',
      backgroundColor: 'var(--background-secondary)',
      borderBottom: '1px solid var(--divider-color)',
      
    
    },
    links: {
     alignItems: 'right'
    },
    
    top: {
      textAlign: "right"
    },
    title: {
      fontSize: '2.5rem',
      margin: '0',
    },
    social: {
      marginTop: '0.5rem',
    },
    link: {
      margin: '0 0.5rem',
      color: 'var( --text-color-secondary)',
      textDecoration: 'none',
    },
   
  };