// import { Picker } from "@react-native-picker/picker"
// import { useState } from "react";
// import { StyleSheet } from "react-native";

// function FilterLabels(routes) {

//     // console.log("filter console log:", routes)
//     const data = routes.props;

//     const [filter, setFilter] = useState([]);


//     return (
//         <Picker
//             style={styles.text}
//             selectedValue={filter}
//             onValueChange={(itemValue, itemIndex) =>
//                 setFilter(itemValue)
//             }>
//             {
//                 data.map((lb) => {
//                     return (
//                         <Picker.Item key={lb} label={lb} value={lb} />
//                     )
//                 })
//             }

//         </Picker>
//     )
// }

// const styles = StyleSheet.create({
//     text: {
//         color: '#F8F8FF'
//     }
// });

// export default FilterLabels