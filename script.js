    const progressBar = document.getElementById("progress-bar");
    const loadingScreen = document.getElementById("loading-screen");
    const loginContainer = document.getElementById("login-container");
    const signupContainer = document.getElementById("signup-container");
    const mapScreen = document.getElementById("map-screen");

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      progressBar.style.width = progress + "%";
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.style.opacity = "0";
          setTimeout(() => {
            loadingScreen.style.display = "none";
            loginContainer.classList.add("show");
          }, 800);
        }, 300);
      }
    }, 60);

    document.getElementById("to-signup").addEventListener("click", () => {
      loginContainer.style.display = "none";
      signupContainer.style.display = "block";
      signupContainer.classList.add("show");
    });

    document.getElementById("to-login").addEventListener("click", () => {
      signupContainer.style.display = "none";
      loginContainer.style.display = "block";
      loginContainer.classList.add("show");
    });

    document.getElementById("signup-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const username = document.getElementById("signup-username").value.trim();
      const password = document.getElementById("signup-password").value;
      const confirm = document.getElementById("signup-confirm").value;
      if (password !== confirm) {
        alert("Passwords do not match!");
        return;
      }
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[username]) {
        alert("Username already exists!");
        return;
      }
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created successfully!");
      document.getElementById("to-login").click();
    });

    document.getElementById("login-form").addEventListener("submit", function(e) {
      e.preventDefault();
      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value;
      const users = JSON.parse(localStorage.getItem("users") || "{}");
      if (users[username] && users[username] === password) {
        loginContainer.style.opacity = "0";
        setTimeout(() => {
          loginContainer.style.display = "none";
          mapScreen.classList.add("show");
        }, 1000);
      } else {
        alert("Invalid username or password!");
      }
    });

    const buildingButtons = document.querySelectorAll(".building-btn");
    const buildingImage = document.getElementById("building-image");
    const buildingTitle = document.getElementById("building-title");

    buildingButtons.forEach(button => {
      button.addEventListener("click", () => {
        const imageSrc = button.dataset.image;
        const buildingName = button.dataset.name;
        buildingImage.style.opacity = 0;
        setTimeout(() => {
          buildingImage.src = imageSrc;
          buildingTitle.textContent = buildingName;
          buildingImage.style.opacity = 1;
        }, 300);
      });
    });

    /* ===== SEARCH FUNCTIONALITY ===== */
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const suggestions = document.getElementById("suggestions");

    const buildings = [
      { name: "Main Building", image: "main-building.jpg.jpg" },
      { name: "Old Building", image: "old-building.jpg" },
      { name: "Garden Campus", image: "garden-campus.jpg.jpg" },
      { name: "Parking Lot", image: "parking-lot.jpg.jpg" },
    ];

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      suggestions.innerHTML = "";
      if (query) {
        const filtered = buildings.filter(b => b.name.toLowerCase().includes(query));
        if (filtered.length > 0) {
          suggestions.style.display = "block";
          filtered.forEach(b => {
            const li = document.createElement("li");
            li.textContent = b.name;
            li.addEventListener("click", () => {
              showBuilding(b.name, b.image);
              suggestions.style.display = "none";
              searchInput.value = "";
            });
            suggestions.appendChild(li);
          });
        } else {
          suggestions.style.display = "none";
        }
      } else {
                suggestions.style.display = "none";
      }
    });

    // ===== SEARCH BUTTON FUNCTIONALITY =====
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.toLowerCase();
      const match = buildings.find(b => b.name.toLowerCase() === query);
      if (match) {
        showBuilding(match.name, match.image);
        suggestions.style.display = "none";
      } else {
        alert("Building not found!");
      }
    });

    // ===== FUNCTION TO DISPLAY SELECTED BUILDING =====
    function showBuilding(name, imageSrc) {
      buildingImage.style.opacity = 0;
      setTimeout(() => {
        buildingImage.src = imageSrc;
        buildingTitle.textContent = name;
        buildingImage.style.opacity = 1;
      }, 300);
    }

    // ===== BURGER MENU FUNCTIONALITY =====
    const menuIcon = document.getElementById("menu-icon");
    const menuDropdown = document.getElementById("menu-dropdown");
    const logoutBtn = document.getElementById("logout-btn");

    menuIcon.addEventListener("click", () => {
      menuDropdown.style.display =
        menuDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
      if (!menuIcon.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.style.display = "none";
      }
    });

    logoutBtn.addEventListener("click", () => {
      mapScreen.classList.remove("show");
      loginContainer.style.display = "block";
      loginContainer.classList.add("show");
    });