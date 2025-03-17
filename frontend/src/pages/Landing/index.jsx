import React from 'react';

import Navbar from './Navbar';
import DefaultLayout from '@layouts/DefaultLayout';
import Jumbotron from '@modules/LandingPage/Jumbotron';
import InfoSection from '@modules/LandingPage/InfoSection';
import ClientSection from '@modules/LandingPage/ClientSection';
import FeaturesSection from '@modules/LandingPage/FeaturesSection';
import FaqSection from '@modules/LandingPage/FaqSection';
import Footer from '@modules/LandingPage/Footer';

const Landing = () => {
    return (
        <DefaultLayout>
            <Navbar />
            <Jumbotron />
            <InfoSection />
            <FeaturesSection />
            <ClientSection />
            <FaqSection />
            <Footer />
        </DefaultLayout>
    )
}

export default Landing