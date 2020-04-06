import React, {useContext} from "react";
import ServicesContext from "../context/ServicesContext";

const withServices = (Wrapped) => {
  return (props) => {
    const services = useContext(ServicesContext)
    const {usersService,  authService, collectionService } = services
    return (
      <Wrapped
        {...props}
        usersService={usersService}
        authService={authService}
        collectionService={collectionService}
      />
    )
  }
}

export default withServices