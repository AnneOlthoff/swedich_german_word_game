

import Head from 'next/head';
//import { ReactComponent as Logo } from "./assets/testlogga.svg"; // Importera SVG som React-komponent


import Header from './components/header';
import Game from './components/game'
import Footer from './components/footer';
import './globals.css'

export default function Home() {


  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="Whoo" />
      </Head>
     
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Game />
        </div>
        <Footer />
      </div>

    </>
  );
}
