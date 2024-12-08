const user = { 
    nombreUsuario: "nombre", 
    email: "correo", 
    redesSociales: ["https://twitter.com/user", "https://instagram.com/user"] 
  };
  
  const redesSocialesContainer = document.getElementById("redesSocialesContainer");
  user.redesSociales.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.trim();
      anchor.target = "_blank";
      anchor.innerText = link;
      redesSocialesContainer.appendChild(anchor);
      redesSocialesContainer.appendChild(document.createElement("br")); // Añade una nueva línea entre enlaces
  });
  