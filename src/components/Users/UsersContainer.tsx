import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// selectTotalUsersCount,
import {
	selectCurrentPage, selectIsFetching, selectPageSize, selectUsers,
	setCurrentPage, selectFollowingInProgress, toogleIsFollowingProgress, getUsers, followUser, unfollowUser
} from '../../redux/usersSlice';
import withoutAuthRedirect from '../hoc/withoutAuthRedirect';
import { AppDispatch } from '../../redux/store';
import Users from './Users';

const UsersContainer: FC = () => {
	const dispatch: AppDispatch = useDispatch();
	const users = useSelector(selectUsers);
	const pageSize = useSelector(selectPageSize);
	let currentPage = useSelector(selectCurrentPage);
	// const totalUsersCount = useSelector(selectTotalUsersCount);
	const isFetching = useSelector(selectIsFetching);
	const followingInProgress = useSelector(selectFollowingInProgress);

	useEffect(() => {
		dispatch(getUsers({ currentPage, pageSize }));
	}, [dispatch, pageSize, currentPage]);

	const onPageChanged = (pageNumber: number) => {
		currentPage = pageNumber;
		dispatch(setCurrentPage(pageNumber));
		dispatch(getUsers({ currentPage, pageSize }));
	};

	const follow = (id: number) => dispatch(followUser(id));

	const unfollow = (id: number) => dispatch(unfollowUser(id));

	const toogleIsFollowingProgressFunction = (fetching: boolean, id: number) =>
		dispatch(toogleIsFollowingProgress({ fetching, id }));

	const UsersWithoutAuthRedirect = withoutAuthRedirect(Users);

	return (
		<UsersWithoutAuthRedirect
			users={users}
			pageSize={pageSize}
			currentPage={currentPage}
			onPageChanged={onPageChanged}
			follow={follow}
			unfollow={unfollow}
			isFetching={isFetching}
			followingInProgress={followingInProgress}
			toogleIsFollowingProgress={toogleIsFollowingProgressFunction}
		/>
	);
};

export default UsersContainer;