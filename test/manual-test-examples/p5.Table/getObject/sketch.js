var table;

function setup() {

  table = new p5.Table();

  table.addColumn("name");
  table.addColumn("type");

  var newRow = table.addRow();
  newRow.setString("name", "Lion");
  newRow.setString("type", "Mammal");

  newRow = table.addRow();
  newRow.setString("name", "Snake");
  newRow.setString("type", "Reptile");

  newRow = table.addRow();
  newRow.setString("name", "Mosquito");
  newRow.setString("type", "Insect");
  
  print("Without a header column:", table.getObject());
  print("With a header column:", table.getObject("name"));
}

// Sketch prints:
// ["Lion", "Snake", "Mosquito"]
