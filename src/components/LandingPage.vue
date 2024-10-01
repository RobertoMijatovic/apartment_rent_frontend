<template>
  <div class="landing-page">
    <nav class="navbar">
      <div class="navbar-brand">Najam Stanova</div>
      <div class="navbar-links">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </nav>
    <div class="introduction">
      <h1>Dobro došli na Najam stanova</h1>
      <p class="intro-paragraph">Ova stranica vam omogućava jednostavan i brz način pristupu prodaji, kupnji, iznajmljivanju na dan ili iznajmljivanju na duže vrijeme raznih nekretnina</p>
    </div>

    <div class="options">
      <div class="option" @click="navigateTo('daily_rents')">
        <h2>Najam na dan</h2>
      </div>
      <div class="option" @click="navigateTo('long_term_rents')">
        <h2>Najam na duže vrijeme</h2>
      </div>
      <div class="option" @click="navigateTo('marketpage')">
        <h2>Prodaja i kupnja nekretnina</h2>
      </div>
    </div>

    <div class="about-us">
      <h2 class="au_title">About Us</h2>
      <p>Dobrodošli na našu stranicu posvećenu nekretninama! Specijalizirani smo za prodaju, kupnju, te kratkoročni i dugoročni najam stanova. Naša misija je pružiti korisnicima jednostavan, brz i pouzdan način za pronalazak savršene nekretnine koja odgovara njihovim potrebama, bilo da traže novi dom, investiciju ili povoljan najam.

S iskustvom u nekretninama, cilj nam je olakšati proces i pružiti profesionalnu podršku našim klijentima na svakom koraku. Bez obzira tražite li stan za kupnju, najam na nekoliko dana ili dugoročni najam, mi smo tu da vam pomognemo pronaći najbolje rješenje.

Naša platforma nudi jednostavno pretraživanje, pregled i mogućnost objave nekretnina kako bi svaki korisnik mogao lako doći do željenih informacija. Vjerujemo u transparentnost, sigurnost i kvalitetu usluge, te smo tu kako bi vaše iskustvo bilo što ugodnije i efikasnije.</p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'LandingPage',
  setup() {
    const router = useRouter();

    const navigateTo = (routeName) => {
      router.push({ name: routeName });
    };

    return {
      navigateTo
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap');

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #003366;
  color: #ffffff;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  gap: 15px;
}

.navbar-links a {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
  margin-right: 50px;
}

.navbar-links a:hover {
  color: #0055a5;
}

.landing-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000407;
  margin-top: 60px;
  width: 100vw; 
  height: 100vh; 
  margin: 0; 
  background-image: url('@/assets/stanovi.jpg');
  background-size: 100% 100%;  
  background-position: center; 
  background-repeat: no-repeat; 
}

.introduction {
  margin-bottom: 20px;
  max-width: 2000px;
}

.intro-paragraph {
  margin-bottom: 160px;
  margin-top: 100px; 
  background-color: #003366;
  display: inline-block; 
  padding: 10px; 
  border-radius: 8px; 
  color: white;
}

.options {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
}

.option {
  display: flex;
  align-items: center; 
  justify-content: center; 
  flex: 1 1 calc(33.33% - 20px); 
  max-width: calc(33.33% - 20px); 
  margin: 10px; 
  padding: 20px;
  background-color: #003366; 
  color: #fff; 
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); 
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s; 
  height: 150px; 
  font-family: 'Roboto', sans-serif;
}

.option:hover {
  background-color: #ffffff; 
  color: #003366; 
  transform: scale(1.05);
}

.about-us {
  margin-top: 100px; 
  max-width: 2000px;
  text-align: justify;
  color: white;
}

h2 {
  margin: 0;
  font-size: 2rem; 
  font-weight: bold;
}

h1 {
  font-size: 3rem;
  font-weight: bold;
  text-align: center;
  background-color: #003366;
  display: inline-block; 
  padding: 10px; 
  border-radius: 8px;
  color: white;
}

p {
  font-size: 1.5rem;
  background-color: #003366;
  display: inline-block; 
  padding: 10px; 
  border-radius: 8px; 
}

@media (max-width: 768px) {
  .option {
    flex: 1 1 100%; 
    max-width: 100%;
  }
}
</style>