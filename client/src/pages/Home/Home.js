import React from 'react'
import './Home.css'
import Header from '../../containers/Header/Header'
import Footer from '../../components/Footer/Footer'

const Home = () => (
  <div className="home">
    <Header />
    <section className="jumbotron">
      <h1>Krello</h1>
    </section>
    <Footer />
  </div>
)

export default Home
