class VendorList {
  //function that renders each element of the Vendor List including: name/policy url and acceptance check box
  renderList(element) {
    return `
    <li id="vendors">${element.name}
        <input type="checkbox" class="tab" data-id=${element.id}>Accept</input>
        <a href=${element.url} class="tab">Link to Vendor policy</a>
    </li>`;
  }
}

export default new VendorList();
