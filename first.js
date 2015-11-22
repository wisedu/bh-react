window.bhCallBack = function(React, ReactDOM, tcomb){

alert("ok");


function Person(props) {
  props = props || {}
  return (
    <Schema name={props.name} label={props.label}>
      <Property name="first" label="First name" defaultValue="" />
      <Property name="last" label="Last name" defaultValue=""/>
    </Schema>
  )
}

var family = (
  <Schema>
    <Person name="mother" label="Mother" defaultValue=""/>
    <Person name="father" label="Father" defaultValue=""/>

  </Schema>
)
/**
<List name="children" label="Children">
  <Person />
</List>
*/
React.render(
  <Form schema={family} />,
  document.getElementById('app'));


}
