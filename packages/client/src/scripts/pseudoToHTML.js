const pseudoToHTML = (pseudoCode) => {
  const items = pseudoCode.split("\n\n");
  let html = "";
  items.forEach((item) => {
    const lines = item.split("\n");
    const title = lines[0];
    const description = lines[1];
    const link = lines[2];
    if (!title || !description || !link) {
      return;
    }
    const linkSplit = link.split(" ");
    const linkText = linkSplit.splice(0, linkSplit.length - 1).join(" ");
    const linkUrl = linkSplit.splice(-1).join(" ");
    html += `
      <div class="card mt-2" style="max-width: 45rem">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <a href="${linkUrl}" class="btn btn-primary">${linkText}</a>
        </div>
      </div>
    `;
  });
  return html;
};

export default pseudoToHTML;
