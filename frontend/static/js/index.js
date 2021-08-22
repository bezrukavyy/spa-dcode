const navigate = url => {
  history.pushState(null, null, url);
  router();
}

const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("viewing dashboard") },
    { path: "/posts", view: () => console.log("viewing posts") },
    { path: "/posts/:id", view: () => console.log("viewing posts for id") },
    { path: "/settings", view: () => console.log("viewing settings") }
  ];

  const potentialMatches = routes.map(route => {
    return {
        route,
        result: location.pathname === route.path 
    }
  });  

  let match = potentialMatches.find(potentialMatch => potentialMatch.result);

  if (!match) {
    match = {
      route: routes[0],
      result: true
    }
  }

  console.log("found match: ", match.route.view );
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  router();
});

document.body.addEventListener("click", event => {
  if (event.target.matches("[data-link]")) {
    event.preventDefault();
    navigate(event.target.href);
  }
});

// const pathToRegex = path =>
//   new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

// /* Route not found - return first route OR a specific "not-found" route */
// if (!match) {
//     match = {
//         route: routes[0],
//         result: [location.pathname]
//     };
// }
