/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
    content: ["*"],
    theme: {
        extend: {
            colors: {
                Marine_blue: "hsl(213, 96%, 18%)",
                Purplish_blue: "hsl(243, 100%, 62%)",
                Pastel_blue: "hsl(228, 100%, 84%)",
                Light_blue: "hsl(206, 94%, 87%)",
                Strawberry_red: "hsl(354, 84%, 57%)",
                Cool_gray: "hsl(231, 11%, 63%)",
                Light_gray: "hsl(229, 24%, 87%)",
                Magnolia: "hsl(217, 100%, 97%)",
                Alabaster: "hsl(231, 100%, 99%)",
                White: "hsl(0, 0%, 100%)"
            },
            backgroundImage: {
                'sidebar_desktop': "url('./assets/images/bg-sidebar-desktop.svg')",
                'sidebar_mobile': "url('./assets/images/bg-sidebar-mobile.svg')"
            },
            screens: {
                'mobile': "389px",
                'desktop': "790px"
            },
            fontFamily: {
                'Ubuntu': ['Ubuntu', 'sans - serif']
            }
        },
    },
    plugins: [
        plugin(function({ addBase }) {
            addBase({
                'html': {
                    fontSize: "16px",

                },
            })
        }),
    ],
}