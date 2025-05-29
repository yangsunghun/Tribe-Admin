import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: ["class"],
  content: ["./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  // dynamic으로 사용시 필요 리스트
  theme: {
    fontSize: {
      heading: ["36px", { lineHeight: "150%", letterSpacing: "-0.025em" }], // Heading 36px
      title1: ["24px", { lineHeight: "150%", letterSpacing: "-0.025em" }], // Title1 24px
      subtitle: ["20px", { lineHeight: "150%", letterSpacing: "-0.015em" }], // Subtitle 20px
      title2: ["18px", { lineHeight: "150%", letterSpacing: "-0.015em" }], // Title2 18px
      body: ["15px", { lineHeight: "150%", letterSpacing: "0" }], // Body2 15px
      caption: ["13px", { lineHeight: "150%", letterSpacing: "0" }], // Caption 13px
      small: ["11px", { lineHeight: "150%", letterSpacing: "0" }] // Small1 11px
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#41DEAC",
          "50": "#ECFCF7",
          "100": "#C4F5E5",
          "200": "#A8F0D9",
          "300": "#80E9C7",
          "400": "#67E5BD",
          "500": "#41DEAC",
          "600": "#3BCA9D",
          "700": "#2E9E7A",
          "800": "#247A5F",
          "900": "#1B5D48"
        },
        secondary: {
          DEFAULT: "#F8680E",
          "50": "#FEF0E7",
          "100": "#FDD0B4",
          "200": "#FCBA90",
          "300": "#FA9A5E",
          "400": "#F9863E",
          "500": "#F8680E",
          "600": "#E25F0D",
          "700": "#B04A0A",
          "800": "#883908",
          "900": "#682C06"
        },
        teritiary: {
          DEFAULT: "#07143A",
          "50": "#E6E8EB",
          "100": "#B2B6C2",
          "200": "#8D93A4",
          "300": "#59627B",
          "400": "#394361",
          "500": "#07143A",
          "600": "#061235",
          "700": "#050E29",
          "800": "#040B20",
          "900": "#030818"
        },
        status: {
          success: "#2A7CF8",
          error: "#F34B3F",
          warning: "#FFCD38",
          info: "#00bf40"
        },
        bg: {
          pale: "#f8fafc",
          light: "#eef2f6"
        },
        gray: {
          "50": "#F5F5F5",
          "100": "#E8E8E8",
          "200": "#D1D1D1",
          "300": "#B8B8B8",
          "400": "#9E9E9E",
          "500": "#878787",
          "600": "#6E6E6E",
          "700": "#575757",
          "800": "#3D3D3D",
          "900": "#242424",
          "950": "#1A1A1A"
        },
        green: {
          "100": "#F0FFF5",
          "200": "#BDFFD3",
          "300": "#8AFFB1",
          "400": "#57FF8F",
          "500": "#24FF6D",
          "600": "#00F050",
          "700": "#00BF40",
          "800": "#008A2E",
          "900": "#00571D",
          "950": "#00240C"
        },
        red: {
          "100": "#FEFAFA",
          "200": "#F9CDCD",
          "300": "#F3A0A0",
          "400": "#ED7373",
          "500": "#E74646",
          "600": "#DF1D1D",
          "700": "#B01717",
          "800": "#831111",
          "900": "#560B0B",
          "950": "#290505"
        },
        yellow: {
          "100": "#FFF4D1",
          "200": "#FFE79E",
          "300": "#FFDA6B",
          "400": "#FFCD38",
          "500": "#FFC107",
          "600": "#D19D00",
          "700": "#9E7700",
          "800": "#6B5000",
          "900": "#382A00",
          "950": "#050400"
        },
        blue: {
          "100": "#D7E7FF",
          "200": "#A4C8FE",
          "300": "#71AAFE",
          "400": "#3F8CFD",
          "500": "#0C6EFD",
          "600": "#0257D4",
          "700": "#0142A2",
          "800": "#012E6F",
          "900": "#01193D",
          "950": "#00040A"
        }
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" }
        },
        scaleUp: {
          from: { transform: "scale(0.95)" },
          to: { transform: "scale(1)" }
        },
        scaleDown: {
          from: { transform: "scale(1)" },
          to: { transform: "scale(0.95)" }
        },
        slideIn: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" }
        },
        slideOut: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" }
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      },
      animation: {
        gradient: "gradient 4s linear infinite",
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-out",
        scaleUp: "scaleUp 0.3s ease-out",
        scaleDown: "scaleDown 0.3s ease-out",
        slideIn: "slideIn 0.3s ease-in-out",
        slideOut: "slideOut 0.3s ease-in-out"
      },
      screens: {
        lt: { max: "1200px" }, // 일반 노트북 크기
        tb: { max: "768px" }, // 일반 타블렛 크기
        mb: { max: "480px" }, // 가장 큰 폰 크기
        mn: { max: "375px" } // 우리 모바일 디자인 시안 크기
      }
    }
  },
  plugins: [
    require("tailwindcss-animate")
    // function ({ addBase }: PluginAPI) { 나중에 rem 크기를 한번에 바꿀 때 사용 , 사용안할 수도 있음.
    //   addBase({
    //     html: {
    //       fontSize: "16px" // 기본 크기
    //     },
    //     "@screen tb": {
    //       html: {
    //         fontSize: "14px" // 중간 값
    //       }
    //     },
    //     "@screen mb": {
    //       html: {
    //         fontSize: "12px" // 모바일 시안을 보면 폰트가 딱 3/4 크기로 줄어들어서 12로 함.
    //       }
    //     }
    //   });
    // }
  ]
};
export default config;
