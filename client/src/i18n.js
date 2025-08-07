// client/src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        team: "Team",
        projects: "Projects",
        publications: "Publications",
        contact: "Contact",
        admin: "Admin",
        dashboard: "Dashboard",
        logout: "Logout",
      },
      hero: {
        title: "Advanced Fluid Mechanics Research",
        subtitle: "Leading the Future of Fluid Dynamics",
        description:
          "Our research team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer, including Magnetohydrodynamics, Turbomachinery, Bioengineering, and more.",
        exploreProjects: "Explore Projects",
        getInTouch: "Get In Touch",
      },
      services: {
        title: "Our Expertise",
        subtitle:
          "Comprehensive research and consulting services in fluid mechanics and computational dynamics",
        research: {
          title: "Advanced Research",
          description:
            "Cutting-edge research in fluid mechanics, turbulence modeling, and computational fluid dynamics for industrial and academic applications.",
        },
        simulation: {
          title: "CFD Simulation",
          description:
            "High-fidelity computational fluid dynamics simulations for complex engineering problems and industrial optimization.",
        },
        consulting: {
          title: "Expert Consulting",
          description:
            "Professional consulting services for industrial and academic fluid mechanics challenges, from concept to implementation.",
        },
      },
      about: {
        title: "About Our Research",
        description:
          "We specialize in cutting-edge research in fluid mechanics, combining theoretical knowledge with practical applications. Our team collaborates with industry leaders and academic institutions worldwide to solve complex fluid dynamics challenges.",
        mission:
          "Our mission is to advance the understanding of fluid mechanics through innovative research and to provide solutions that benefit society and industry.",
        vision:
          "To be a leading research center that bridges the gap between fundamental fluid mechanics research and practical engineering solutions.",
      },
      home: {
        stats: {
          title: "Our Impact",
          years: "Years of Experience",
          projects: "Completed Projects",
          publications: "Research Publications",
          collaborations: "Industry Collaborations",
        },
        featuredProjects: {
          title: "Featured Research Projects",
          subtitle:
            "Discover our latest innovations in fluid mechanics and computational dynamics",
        },
        sampleProject: {
          title1: "Advanced Turbulence Modeling",
          description1:
            "Development of novel turbulence models for high Reynolds number flows in complex industrial geometries.",
          title2: "Heat Transfer Optimization",
          description2:
            "Innovative thermal management solutions for high-performance electronic systems and industrial applications.",
          title3: "Bioengineering Applications",
          description3:
            "Microfluidic systems and drug delivery mechanisms using advanced fluid mechanics principles.",
        },
        viewAllProjects: "View All Projects",
        cta: {
          title: "Ready to Collaborate?",
          description:
            "Join us in advancing the frontiers of fluid mechanics research and engineering innovation.",
          contact: "Contact Us",
          meetTeam: "Meet Our Team",
        },
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Ready to collaborate or have questions about our research?",
        form: {
          name: "Full Name",
          email: "Email Address",
          subject: "Subject",
          message: "Message",
          submit: "Send Message",
          sending: "Sending...",
          success: "Message sent successfully!",
          error: "Failed to send message. Please try again.",
        },
        info: {
          address: "Address",
          email: "Email",
          phone: "Phone",
          hours: "Office Hours",
          response: "Quick Response",
        },
        details: {
          address:
            "Department of Mechanical Engineering\nUniversity Campus\nAthens, Greece 15773",
          email: "info@fluidlab.com",
          phone: "+30 210 123 4567",
          hours: "Monday - Friday: 9:00 AM - 5:00 PM",
          response:
            "We typically respond within 24 hours during business days.",
        },
      },
      team: {
        title: "Our Research Team",
        subtitle:
          "Meet the experts driving innovation in fluid mechanics research",
      },
      projects: {
        title: "Research Projects",
        subtitle:
          "Exploring the frontiers of fluid mechanics and computational dynamics",
      },
      publications: {
        title: "Publications",
        subtitle: "Our contributions to the scientific community",
      },
      footer: {
        description:
          "Leading research in fluid mechanics and computational fluid dynamics. Advancing the future of flow analysis and simulation.",
        quickLinks: "Quick Links",
        researchAreas: "Research Areas",
        contact: "Contact Information",
        copyright: "© 2024 Fluid Mechanics Research Lab. All rights reserved.",
        areas: {
          cfd: "Computational Fluid Dynamics",
          turbomachinery: "Turbomachinery",
          heat: "Heat Transfer",
          mhd: "Magnetohydrodynamics",
          bio: "Bioengineering Applications",
        },
      },
      common: {
        learnMore: "Learn More",
        readMore: "Read More",
        viewDetails: "View Details",
        backToHome: "Back to Home",
        loading: "Loading...",
        error: "An error occurred",
        tryAgain: "Try Again",
      },
    },
  },
  el: {
    translation: {
      nav: {
        home: "Αρχική",
        about: "Σχετικά",
        team: "Ομάδα",
        projects: "Έργα",
        publications: "Δημοσιεύσεις",
        contact: "Επικοινωνία",
        admin: "Διαχείριση",
        dashboard: "Πίνακας Ελέγχου",
        logout: "Αποσύνδεση",
      },
      hero: {
        title: "Προηγμένη Έρευνα Μηχανικής Ρευστών",
        subtitle: "Οδηγώντας το Μέλλον της Δυναμικής Ρευστών",
        description:
          "Η ερευνητική μας ομάδα προσφέρει αποδοτικές υπηρεσίες έρευνας και συμβουλευτικής σε πολλές πτυχές της Ροής Ρευστών, Υδραυλικής και Μεταφοράς Θερμότητας, συμπεριλαμβανομένης της Μαγνητοϋδροδυναμικής, Στροβιλομηχανών, Βιοτεχνολογίας και άλλων.",
        exploreProjects: "Εξερευνήστε τα Έργα",
        getInTouch: "Επικοινωνήστε Μαζί Μας",
      },
      services: {
        title: "Η Εξειδίκευσή Μας",
        subtitle:
          "Ολοκληρωμένες υπηρεσίες έρευνας και συμβουλευτικής στη μηχανική ρευστών και υπολογιστική δυναμική",
        research: {
          title: "Προηγμένη Έρευνα",
          description:
            "Πρωτοποριακή έρευνα στη μηχανική ρευστών, μοντελοποίηση τύρβης και υπολογιστική δυναμική ρευστών για βιομηχανικές και ακαδημαϊκές εφαρμογές.",
        },
        simulation: {
          title: "Προσομοίωση CFD",
          description:
            "Υψηλής ακρίβειας προσομοιώσεις υπολογιστικής δυναμικής ρευστών για σύνθετα μηχανολογικά προβλήματα και βιομηχανική βελτιστοποίηση.",
        },
        consulting: {
          title: "Εξειδικευμένη Συμβουλευτική",
          description:
            "Επαγγελματικές συμβουλευτικές υπηρεσίες για βιομηχανικές και ακαδημαϊκές προκλήσεις μηχανικής ρευστών, από την ιδέα στην υλοποίηση.",
        },
      },
      about: {
        title: "Σχετικά με την Έρευνά μας",
        description:
          "Ειδικευόμαστε σε πρωτοποριακή έρευνα στη μηχανική ρευστών, συνδυάζοντας θεωρητική γνώση με πρακτικές εφαρμογές. Η ομάδα μας συνεργάζεται με ηγέτες της βιομηχανίας και ακαδημαϊκά ιδρύματα παγκοσμίως για να λύσει σύνθετες προκλήσεις δυναμικής ρευστών.",
        mission:
          "Η αποστολή μας είναι να προωθήσουμε την κατανόηση της μηχανικής ρευστών μέσω καινοτόμου έρευνας και να παρέχουμε λύσεις που ωφελούν την κοινωνία και τη βιομηχανία.",
        vision:
          "Να αποτελέσουμε έναν κορυφαίο ερευνητικό κέντρο που γεφυρώνει το χάσμα μεταξύ της θεμελιώδους έρευνας μηχανικής ρευστών και των πρακτικών μηχανολογικών λύσεων.",
      },
      home: {
        stats: {
          title: "Ο Αντίκτυπός Μας",
          years: "Χρόνια Εμπειρίας",
          projects: "Ολοκληρωμένα Έργα",
          publications: "Ερευνητικές Δημοσιεύσεις",
          collaborations: "Βιομηχανικές Συνεργασίες",
        },
        featuredProjects: {
          title: "Προβεβλημένα Ερευνητικά Έργα",
          subtitle:
            "Ανακαλύψτε τις πιο πρόσφατες καινοτομίες μας στη μηχανική ρευστών και υπολογιστική δυναμική",
        },
        sampleProject: {
          title1: "Προηγμένη Μοντελοποίηση Τύρβης",
          description1:
            "Ανάπτυξη καινοτόμων μοντέλων τύρβης για ροές υψηλού αριθμού Reynolds σε σύνθετες βιομηχανικές γεωμετρίες.",
          title2: "Βελτιστοποίηση Μεταφοράς Θερμότητας",
          description2:
            "Καινοτόμες λύσεις θερμικής διαχείρισης για ηλεκτρονικά συστήματα υψηλών επιδόσεων και βιομηχανικές εφαρμογές.",
          title3: "Εφαρμογές Βιοτεχνολογίας",
          description3:
            "Μικρορευστικά συστήματα και μηχανισμοί χορήγησης φαρμάκων χρησιμοποιώντας προηγμένες αρχές μηχανικής ρευστών.",
        },
        viewAllProjects: "Δείτε Όλα τα Έργα",
        cta: {
          title: "Έτοιμοι για Συνεργασία;",
          description:
            "Ελάτε μαζί μας να προωθήσουμε τα σύνορα της έρευνας μηχανικής ρευστών και της μηχανολογικής καινοτομίας.",
          contact: "Επικοινωνήστε Μαζί Μας",
          meetTeam: "Γνωρίστε την Ομάδα Μας",
        },
      },
      contact: {
        title: "Επικοινωνήστε Μαζί Μας",
        subtitle:
          "Έτοιμοι για συνεργασία ή έχετε ερωτήσεις σχετικά με την έρευνά μας;",
        form: {
          name: "Πλήρες Όνομα",
          email: "Διεύθυνση Email",
          subject: "Θέμα",
          message: "Μήνυμα",
          submit: "Αποστολή Μηνύματος",
          sending: "Αποστέλλεται...",
          success: "Το μήνυμα στάλθηκε επιτυχώς!",
          error: "Αποτυχία αποστολής μηνύματος. Παρακαλούμε δοκιμάστε ξανά.",
        },
        info: {
          address: "Διεύθυνση",
          email: "Email",
          phone: "Τηλέφωνο",
          hours: "Ωράριο Γραφείου",
          response: "Γρήγορη Απάντηση",
        },
        details: {
          address:
            "Τμήμα Μηχανολόγων Μηχανικών\nΠανεπιστημιούπολη\nΑθήνα, Ελλάδα 15773",
          email: "info@fluidlab.com",
          phone: "+30 210 123 4567",
          hours: "Δευτέρα - Παρασκευή: 9:00 π.μ. - 5:00 μ.μ.",
          response: "Συνήθως απαντάμε εντός 24 ωρών κατά τις εργάσιμες ημέρες.",
        },
      },
      team: {
        title: "Η Ερευνητική μας Ομάδα",
        subtitle:
          "Γνωρίστε τους ειδικούς που οδηγούν την καινοτομία στην έρευνα μηχανικής ρευστών",
      },
      projects: {
        title: "Ερευνητικά Έργα",
        subtitle:
          "Εξερευνώντας τα σύνορα της μηχανικής ρευστών και υπολογιστικής δυναμικής",
      },
      publications: {
        title: "Δημοσιεύσεις",
        subtitle: "Οι συνεισφορές μας στην επιστημονική κοινότητα",
      },
      footer: {
        description:
          "Κορυφαία έρευνα στη μηχανική ρευστών και υπολογιστική δυναμική ρευστών. Προωθώντας το μέλλον της ανάλυσης και προσομοίωσης ροής.",
        quickLinks: "Γρήγοροι Σύνδεσμοι",
        researchAreas: "Ερευνητικές Περιοχές",
        contact: "Στοιχεία Επικοινωνίας",
        copyright:
          "© 2024 Εργαστήριο Έρευνας Μηχανικής Ρευστών. Όλα τα δικαιώματα διατηρούνται.",
        areas: {
          cfd: "Υπολογιστική Δυναμική Ρευστών",
          turbomachinery: "Στροβιλομηχανές",
          heat: "Μεταφορά Θερμότητας",
          mhd: "Μαγνητοϋδροδυναμική",
          bio: "Εφαρμογές Βιοτεχνολογίας",
        },
      },
      common: {
        learnMore: "Μάθετε Περισσότερα",
        readMore: "Διαβάστε Περισσότερα",
        viewDetails: "Δείτε Λεπτομέρειες",
        backToHome: "Επιστροφή στην Αρχική",
        loading: "Φόρτωση...",
        error: "Προέκυψε σφάλμα",
        tryAgain: "Δοκιμάστε Ξανά",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
  });

export default i18n;
