// client/src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

// Μεταφράσεις
const translations = {
  en: {
    // Navigation
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
    // Hero Section
    hero: {
      title: "Advanced Fluid Mechanics Research",
      subtitle: "Leading the Future of Fluid Dynamics",
      description:
        "Our research team offers efficient research and consulting services in many aspects of Fluid Flow, Hydraulics and Convective Heat Transfer.",
      exploreProjects: "Explore Projects",
      getInTouch: "Get in Touch",
    },
    // Services
    services: {
      title: "Our Expertise",
      subtitle:
        "Comprehensive research and consulting services in fluid mechanics and computational dynamics",
      cfd: {
        title: "Computational Fluid Dynamics",
        description:
          "Advanced CFD simulations and modeling for complex flow problems.",
      },
      experimental: {
        title: "Experimental Methods",
        description:
          "Cutting-edge experimental techniques for flow visualization and measurement.",
      },
      consulting: {
        title: "Research Consulting",
        description:
          "Expert consulting services for industrial and academic fluid mechanics challenges.",
      },
    },
    // Projects
    projects: {
      title: "Featured Projects",
      subtitle:
        "Explore our latest research initiatives and groundbreaking discoveries",
      viewDetails: "View Details",
      viewAll: "View All Projects",
      status: {
        active: "Active",
        completed: "Completed",
        planned: "Planned",
      },
    },
    // Publications
    publications: {
      title: "Recent Publications",
      subtitle:
        "Stay up-to-date with our latest research findings and scientific contributions",
      readMore: "Read More",
      viewAll: "View All Publications",
    },
    // CTA
    cta: {
      title: "Ready to Collaborate?",
      subtitle:
        "Whether you're looking for research partnerships, consulting services, or academic collaboration, we're here to help advance your fluid mechanics projects.",
      contact: "Contact Us Today",
    },
    // Footer
    footer: {
      description:
        "Leading research in fluid mechanics and computational fluid dynamics. Advancing the future of flow analysis and simulation.",
      quickLinks: "Quick Links",
      researchAreas: "Research Areas",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
    },
    // Common
    common: {
      backToHome: "Back to Home",
      back: "Back",
      home: "Home",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      update: "Update",
      close: "Close",
    },
  },
  el: {
    // Navigation
    nav: {
      home: "Αρχική",
      about: "Σχετικά",
      team: "Ομάδα",
      projects: "Έρευνες",
      publications: "Δημοσιεύσεις",
      contact: "Επικοινωνία",
      admin: "Διαχείριση",
      dashboard: "Πίνακας Ελέγχου",
      logout: "Αποσύνδεση",
    },
    // Hero Section
    hero: {
      title: "Προηγμένη Έρευνα στη Ρευστομηχανική",
      subtitle: "Ηγούμαστε στο Μέλλον της Ρευστοδυναμικής",
      description:
        "Η ερευνητική μας ομάδα προσφέρει αποδοτικές ερευνητικές και συμβουλευτικές υπηρεσίες σε πολλές πτυχές της Ροής Ρευστών, της Υδραυλικής και της Μεταφοράς Θερμότητας.",
      exploreProjects: "Εξερεύνηση Ερευνών",
      getInTouch: "Επικοινωνήστε Μαζί Μας",
    },
    // Services
    services: {
      title: "Η Εξειδίκευσή μας",
      subtitle:
        "Ολοκληρωμένες ερευνητικές και συμβουλευτικές υπηρεσίες στη ρευστομηχανική και υπολογιστική δυναμική",
      cfd: {
        title: "Υπολογιστική Ρευστοδυναμική",
        description:
          "Προηγμένες προσομοιώσεις CFD και μοντελοποίηση για πολύπλοκα προβλήματα ροής.",
      },
      experimental: {
        title: "Πειραματικές Μέθοδοι",
        description:
          "Τεχνολογίες αιχμής για την οπτικοποίηση και μέτρηση ροής.",
      },
      consulting: {
        title: "Ερευνητική Συμβουλευτική",
        description:
          "Εξειδικευμένες συμβουλευτικές υπηρεσίες για βιομηχανικές και ακαδημαϊκές προκλήσεις ρευστομηχανικής.",
      },
    },
    // Projects
    projects: {
      title: "Κύριες Έρευνες",
      subtitle:
        "Εξερευνήστε τις πιο πρόσφατες ερευνητικές μας πρωτοβουλίες και τις πρωτοποριακές ανακαλύψεις",
      viewDetails: "Λεπτομέρειες",
      viewAll: "Όλες οι Έρευνες",
      status: {
        active: "Ενεργή",
        completed: "Ολοκληρωμένη",
        planned: "Προγραμματισμένη",
      },
    },
    // Publications
    publications: {
      title: "Πρόσφατες Δημοσιεύσεις",
      subtitle:
        "Ενημερωθείτε για τα πιο πρόσφατα ερευνητικά μας ευρήματα και τις επιστημονικές συνεισφορές",
      readMore: "Περισσότερα",
      viewAll: "Όλες οι Δημοσιεύσεις",
    },
    // CTA
    cta: {
      title: "Έτοιμοι για Συνεργασία;",
      subtitle:
        "Είτε αναζητάτε ερευνητικές συνεργασίες, συμβουλευτικές υπηρεσίες ή ακαδημαϊκή συνεργασία, είμαστε εδώ για να βοηθήσουμε στην προώθηση των έργων ρευστομηχανικής σας.",
      contact: "Επικοινωνήστε Σήμερα",
    },
    // Footer
    footer: {
      description:
        "Πρωτοπόρος έρευνα στη ρευστομηχανική και υπολογιστική ρευστοδυναμική. Προωθούμε το μέλλον της ανάλυσης και προσομοίωσης ροής.",
      quickLinks: "Γρήγοροι Σύνδεσμοι",
      researchAreas: "Ερευνητικοί Τομείς",
      privacy: "Πολιτική Απορρήτου",
      terms: "Όροι Υπηρεσίας",
      rights: "Όλα τα δικαιώματα διατηρούνται.",
    },
    // Common
    common: {
      backToHome: "Επιστροφή στην Αρχική",
      back: "Πίσω",
      home: "Αρχική",
      loading: "Φόρτωση...",
      save: "Αποθήκευση",
      cancel: "Ακύρωση",
      edit: "Επεξεργασία",
      delete: "Διαγραφή",
      add: "Προσθήκη",
      update: "Ενημέρωση",
      close: "Κλείσιμο",
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Φόρτωση από localStorage ή default 'en'
    return localStorage.getItem("language") || "en";
  });

  // Αποθήκευση στο localStorage όταν αλλάζει η γλώσσα
  useEffect(() => {
    localStorage.setItem("language", language);
    // Ενημέρωση του HTML lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const t = (key, defaultValue = "") => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }

    return value || defaultValue || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: [
      { code: "en", name: "English", flag: "🇺🇸" },
      { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
    ],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
