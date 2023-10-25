
import { Button, Table, } from 'flowbite-react';
import UsersGet from '../../../API/UsersGet';
import { becomeHost, deleteUser } from '../../../API/Auth';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const ManageUser = () => {
    const { loading } = useContext(AuthContext)
    const [usersAll, refetch] = UsersGet()
    console.log(usersAll);

    const deleteC = (id) => {
        console.log(id, 'delete');
        deleteUser(id)
            .then(data => {
                toast.success('successfully Delete ')
                refetch()
            })
    }
    const makeAdmin = (_id) => {
        console.log(_id);
        becomeHost(_id)
            .then(data => {
                refetch()
            })

    }
    return (
        <div className='myContainer'>
            <h2 className='text-center text-4xl font-semibold'>All users</h2>

            <Table>
                <Table.Head>

                    <Table.HeadCell>
                        Email
                    </Table.HeadCell>

                    <Table.HeadCell>
                        <span className='flex justify-center'> Action To First</span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className='flex justify-center'> Action To First</span>
                    </Table.HeadCell>
                </Table.Head>
                {
                    loading ?
                        <></>
                        :

                        usersAll?.map(user => <Table.Body key={user._id} className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

                                <Table.Cell>
                                    {user.email}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='flex gap-2'>
                                        <>
                                            {

                                                <Button onClick={() => makeAdmin(user._id)} className='bg-green-600 text-white'>
                                                    {user.role === 'admin' ? "admin" : <>Make Admin</>}
                                                </Button>

                                            }
                                        </>

                                    </div>
                                </Table.Cell>

                                <Table.Cell className='flex justify-center'>
                                    <div className='flex gap-2'>
                                        <>

                                            {
                                                <Button onClick={() => deleteC(user._id)} color="warning">
                                                    Delete user
                                                </Button>

                                            } </>

                                    </div>
                                </Table.Cell>
                            </Table.Row>

                        </Table.Body>)

                }

            </Table>
        </div>
    );
};

export default ManageUser;