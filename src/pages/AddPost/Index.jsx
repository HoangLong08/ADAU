import React from "react";
import { connect } from "react-redux";

function Index({ listTabAddPost }) {
  return <div></div>;
}

const mapStateToProps = (state) => {
  const {listTabAddPost} = state.authAdminReducer;
  return {
		listTabAddPost: listTabAddPost
	};
};

// const mapDispatchToProps = (dispatch) => {
//   return {

//   };
// };

export default connect(mapStateToProps, null)(Index);
