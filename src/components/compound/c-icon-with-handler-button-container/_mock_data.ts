import {
  EMode,
  ICIconWithHandlerButtonContainer,
} from "@src/types/compound/c-icon-with-handler-button-container";

export const mockDataForTest: ICIconWithHandlerButtonContainer[] = [
  {
    foodId: "T_e_x_a_s_ _Z_i_n_g_e_r_ _B_e_l_l_17814346472074",
    mode: EMode.UPDATE,
    existFoodData: {
      name: "Texas Zinger Bell",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,\nmolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum\nnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium\noptio, eaque rerum! Provident similique accusantium nemo autem. Veritatis\nobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam\nnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,\ntenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,",
      image:
        "/assert/T_e_x_a_s_ _Z_i_n_g_e_r_ _B_e_l_l_17143464720741714346472074.jpg",
      price: "25",
      foodId: "T_e_x_a_s_ _Z_i_n_g_e_r_ _B_e_l_l_17814346472074",
    },
  },
  {
    foodId: "T_e_x_a_s_ _Z_i_n_g_e_r_ _B_e_l_l_17814346472074",
    mode: EMode.DELETE,
  },
];
