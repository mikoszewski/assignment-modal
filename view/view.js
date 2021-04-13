class VendorList {
  //function that renders each element of the Vendor List including: name/policy url and acceptance check box
  renderList(element) {
    return `
    <li id="vendors"><div style="display: inline-block; width: 50%;">${element.name}</div>
        <input type="checkbox" class="tab" data-id=${element.id}>Accept</input>
        <a style="float: right;" href=${element.url} class="tab">Link to Vendor policy</a>
    </li>`;
  }
}

export default new VendorList();
