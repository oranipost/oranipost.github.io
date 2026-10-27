(() => {
  // Preserve section links shared from the earlier homepage.
  const oldAnchors = {'#portfolio':'#projects', '#selected-work':'#projects', '#software':'#projects'};
  if (oldAnchors[location.hash]) location.replace(oldAnchors[location.hash]);
})();
