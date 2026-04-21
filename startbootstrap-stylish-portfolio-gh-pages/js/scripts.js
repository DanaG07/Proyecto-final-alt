window.addEventListener("DOMContentLoaded", (event) => {
  const sidebarWrapper = document.getElementById("sidebar-wrapper");
  let scrollToTopVisible = false;
  // Closes the sidebar menu
  const menuToggle = document.body.querySelector(".menu-toggle");
  menuToggle.addEventListener("click", (event) => {
    event.preventDefault();
    sidebarWrapper.classList.toggle("active");
    _toggleMenuIcon();
    menuToggle.classList.toggle("active");
  });

  // Closes responsive menu when a scroll trigger link is clicked
  var scrollTriggerList = [].slice.call(
    document.querySelectorAll("#sidebar-wrapper .js-scroll-trigger"),
  );
  scrollTriggerList.map((scrollTrigger) => {
    scrollTrigger.addEventListener("click", () => {
      sidebarWrapper.classList.remove("active");
      menuToggle.classList.remove("active");
      _toggleMenuIcon();
    });
  });
  const SUPABASE_URL = "https://rnfmgacqvuqctrxcpmyl.supabase.co";
  const SUPABASE_ANON = "sb_publishable_uUqE0AsisKxf5KWnQQhggw_oFLIQXQv";

  const { createClient } = supabase;
  const db = createClient(SUPABASE_URL, SUPABASE_ANON);

  function _toggleMenuIcon() {
    const menuToggleBars = document.body.querySelector(
      ".menu-toggle > .fa-bars",
    );
    const menuToggleTimes = document.body.querySelector(
      ".menu-toggle > .fa-xmark",
    );
    if (menuToggleBars) {
      menuToggleBars.classList.remove("fa-bars");
      menuToggleBars.classList.add("fa-xmark");
    }
    if (menuToggleTimes) {
      menuToggleTimes.classList.remove("fa-xmark");
      menuToggleTimes.classList.add("fa-bars");
    }
  }

  // Scroll to top button appear
  document.addEventListener("scroll", () => {
    const scrollToTop = document.body.querySelector(".scroll-to-top");
    if (document.documentElement.scrollTop > 100) {
      if (!scrollToTopVisible) {
        fadeIn(scrollToTop);
        scrollToTopVisible = true;
      }
    } else {
      if (scrollToTopVisible) {
        fadeOut(scrollToTop);
        scrollToTopVisible = false;
      }
    }
  });

  function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= 0.1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += 0.1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }
  // Initialize the map
  var map = L.map("map").setView([25.5464508, -103.5214584], 12); // Coordinates provided by user

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 15,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const lugaresFijos = [
    { nombre: "Gimnasio T Fit", latitud: 25.5697282, longitud: -103.5017665 },
    {
      nombre: "Gimnasio VC Sport",
      latitud: 25.5945235,
      longitud: -103.4818795,
    },
    {
      nombre: "Gimnasio FIT & GYM",
      latitud: 25.5972803,
      longitud: -103.4970302,
    },
    {
      nombre: "Gimnasio Body Building",
      latitud: 25.5692435,
      longitud: -103.5215424,
    },
    {
      nombre: "Gimnasio X Fitness Center",
      latitud: 25.5509919,
      longitud: -103.5395605,
    },
    { latitud: 25.5551401, longitud: -103.5198526, nombre: "Gimnasio ERA" },
    {
      nombre: "Gimnasio Verano GYM Lerdo",
      latitud: 25.5435426,
      longitud: -103.5433666,
    },
    {
      nombre: "Gimnasio LUX Fitness",
      latitud: 25.564554,
      longitud: -103.4968703,
    },
    {
      nombre: "Gimnasio Smart Fit - Las Fuentes",
      latitud: 25.5508462,
      longitud: -103.4810434,
    },
    {
      nombre: "Gimnasio King GYM",
      latitud: 25.5509915,
      longitud: -103.5475605,
    },
    {
      nombre: "Gimnasio Smart Fit - Plaza Silos",
      latitud: 25.5508001,
      longitud: -103.4810436,
    },
    {
      nombre: "Gimnasio Full Body GYM",
      latitud: 25.5509915,
      longitud: -103.5475605,
    },
    {
      nombre: "Gimnasio Sport Life Fitness",
      latitud: 25.549628,
      longitud: -103.5317394,
    },
    {
      nombre: "Gimnasio Planet GYM",
      latitud: 25.5235041,
      longitud: -103.5050538,
    },
    {
      nombre: "Gimnasio La Piedra",
      latitud: 25.5524093,
      longitud: -103.5637409,
    },
    {
      nombre: "Gimnasio Elite Fitness",
      latitud: 25.5375832,
      longitud: -103.481111,
    },
    { nombre: "Gimnasio Saiyagym", latitud: 25.5520177, longitud: -103.587371 },
  ];
  lugaresFijos.forEach((lugar) => {
    L.marker([lugar.latitud, lugar.longitud])
      .addTo(map)
      .bindPopup(lugar.nombre);
  });
  lugaresFijos.forEach(({ latitud, longitud, nombre }) => {
    L.marker([latitud, longitud])
      .addTo(map)
      .bindPopup(nombre)
      .on("click", () => {
        document.getElementById("place-name").value = nombre;
        document.getElementById("place-lng").value = longitud;
        document.getElementById("place-lat").value = latitud;
        document.getElementById("modal").style.display = "flex";
      });
  });

  let clickMarker = null;

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;

    if (clickMarker) map.removeLayer(clickMarker);

    clickMarker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`)
      .openPopup();

    document.getElementById("place-name").value = "";
    document.getElementById("place-lng").value = lng;
    document.getElementById("place-lat").value = lat;
    document.getElementById("modal").style.display = "flex";
  });

  document.getElementById("btn-save").addEventListener("click", async () => {
    const nombre = document.getElementById("place-name").value.trim();
    const lat = parseFloat(document.getElementById("place-lat").value);
    const lng = parseFloat(document.getElementById("place-lng").value);

    if (!nombre) {
      alert("Escribe un nombre");
      return;
    }

    const { error } = await db.from("coordinates").insert([
      {
        nombre,
        latitud: lat,
        longitud: lng,
      },
    ]);

    if (error) {
      alert("Error al guardar: " + error.message);
      console.error("Error al guardar:", error);
    } else {
      alert(`${nombre} guardado correctamente!`);
      document.getElementById("modal").style.display = "none";
    }
  });

  document.getElementById("btn-cancel").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
  });
});
