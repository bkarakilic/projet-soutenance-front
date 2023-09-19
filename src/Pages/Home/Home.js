import React, { useState } from 'react';
import { IsAuthRedirect } from "../../Services/isAuthRedirect";



function Home () {
    IsAuthRedirect();
}

export default Home;
