import React, {useEffect} from "react"
import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { getUsersList } from "../../redux/actions/userActions"
import CircularIndeterminate from "../Loader"
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

export const UserList = () => {

    const dispatch = useDispatch()
    const usersList = useSelector(state => state.usersList)
    const {loading, error, users} = usersList
    console.log(users)

    useEffect(() => {
        dispatch(getUsersList())

    }, [dispatch])


    return (
        <div>
            <h1>Users</h1>
            <br></br>
            { loading ? <CircularIndeterminate/>
            : error ? <h1>Probleme</h1> : (
                <Table style={{ }}  size="md" striped bordered hover responsive className="table-md">
                    <thead>
                        <th>ID</th> 
                        <th>name</th>
                        <th>email</th>
                        <th style={{width: 180}}>admin</th>
                    </thead>
                    <tbody >
                        {users?.map((user) =>  (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.first_name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_staff ? (
                                    <DoneIcon sx={{color: 'green'}}/>
                                ) : (
                                    <CloseIcon sx={{color : 'red'}}/>
                                )}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}