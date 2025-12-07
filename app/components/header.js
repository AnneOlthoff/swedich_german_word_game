'use client'; 




export default function Header() {
  


 
  
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