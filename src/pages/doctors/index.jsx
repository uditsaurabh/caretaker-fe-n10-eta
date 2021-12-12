import React, { useState, useEffect } from 'react';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { DyteMeeting } from 'dyte-client';
import {
	getDoctor,
	getUser,
	loadingDone,
	loadingInit,
} from 'redux/userActions';
import { showMessage, defaultImage, warnMessage } from 'constants/constant';
import secureAxios from 'services/http';
import createroom from 'services/createRoom';
import CommonCard from 'common/card';
import OrangeButton from 'common/button/index';
import TextInput from 'common/input';
import PreLoader from 'common/loader';
import AddDoctor from './addDoctor';
import './index.scss';

const Doctors = ({ boarding }) => {
	const dispatch = useDispatch();
	const { doctor, loading, token, user } = useSelector(
		(state) => state.userReducer
	);
	const [openDoctor, setOpenDoctor] = useState(doctor[0]);
	const [addDoctor, setAddDoctor] = useState(false);
	const [query, setQuery] = useState('');
	const [doctorList, setDoctorList] = useState('');
	const [load, setLoad] = useState(false);
	const [authToken, setAuthToken] = useState('');
	const [isCall, setIsCall] = useState(false);
	const { phone_number, user_name } = user?.data || '';
	const { meetingId, roomName } = openDoctor || '';

	// to view the profile of doctor
	const viewDoctor = (name) => {
		doctor.forEach((item) => {
			const { user_name } = item;
			if (user_name === name) {
				setOpenDoctor(item);
			}
		});
	};

	const handleCloseDialog = () => {
		setAddDoctor(false);
	};

	//for adding user in the call
	const handleCall = () => {
		if (meetingId) {
			createroom
				.post(`/meetings/${meetingId}/participant`, {
					userDetails: {
						name: user_name,
					},
					clientSpecificId: phone_number,
					roleName: 'participant',
				})
				.then((res) => {
					const { data } = res;
					if (data.success) {
						const { authToken } = data.data.authResponse;
						setAuthToken(authToken);
						setIsCall(false);
					}
				})
				.catch((error) => {
					throw error;
				});
		}
	};

	//script for razorpay
	const loadScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	};

	//razor pay logic
	const handlePay = async () => {
		setLoad(true);
		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);

		if (!res) {
			warnMessage('Razorpay SDK failed to load. Are you online?');
			return;
		}

		const { _id } = openDoctor;
		const payload = {
			access_token: token,
			doctor_id: _id,
		};

		const result = await secureAxios.post('/make_payment', payload);

		if (!result) {
			warnMessage('Server error. Are you online?');
			return;
		} else {
			setLoad(false);
		}

		const { amount, order_id } = result.data.data;

		const options = {
			key: process.env.REACT_APP_PAY_ID,
			amount: amount.toString(),
			currency: 'INR',
			name: 'Care Tracker',
			description: 'Consultancy fees',
			order_id: order_id,
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					razorpaySignature: response.razorpay_signature,
				};
				dispatch(loadingInit());

				const result = await secureAxios.post('/payment_success', data);
				if (result.data.status) {
					showMessage('Payment success');
					dispatch(loadingDone());
					setIsCall(true);
				} else {
					warnMessage('Payment failed');
				}
			},
			prefill: {
				name: user_name,
				contact: phone_number,
				email: `${user_name}@mail.com`,
			},
			theme: {
				color: '#dc4405',
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	};

	const updateInput = (input) => {
		if (doctor) {
			const filtered = doctor.filter((item) => {
				return item.user_name
					.toLowerCase()
					.includes(input.toLowerCase());
			});
			setQuery(input);
			setDoctorList(filtered);
		}
	};

	useEffect(() => {
		dispatch(getDoctor());
		dispatch(getUser(token));
	}, []); //eslint-disable-line

	const {
		doctor_experience,
		doctorProfilePhoto,
		doctor_expertise,
		user_name: doctorName,
		doctor_fees,
	} = openDoctor || '';

	const doctorProfiles = doctorList ? doctorList : doctor;
	return (
		<>
			{loading ? (
				<div className="loading">
					<CommonCard>
						<PreLoader />
					</CommonCard>
				</div>
			) : (
				<div className="doctors">
					<CommonCard>
						<div className="doctor-list">
							<div className="doc-top">
								<div className="search-bar">
									<TextInput
										placeholder="Search doctor..."
										value={query}
										change={(e) =>
											updateInput(e.target.value)
										}
									/>
									<SearchOutlined />
								</div>
								{boarding && (
									<div className="add-doc">
										<UserAddOutlined
											onClick={() => setAddDoctor(true)}
										/>
									</div>
								)}
							</div>
							<div className="list-content">
								{doctor.length > 0 &&
									doctorProfiles.map((item, i) => {
										const {
											doctor_experience,
											doctorProfilePhoto,
											doctor_expertise,
											user_name,
										} = item;
										return (
											<div
												className={
													user_name === doctorName
														? 'list active'
														: 'list'
												}
												key={i}
												onClick={() =>
													viewDoctor(user_name)
												}
											>
												<img
													src={
														doctorProfilePhoto
															? doctorProfilePhoto
															: defaultImage
													}
													alt="member"
												/>
												<div className="info">
													<p>
														Name - Dr. {user_name}
													</p>
													<p>
														Expertise -{' '}
														{doctor_expertise}
													</p>
													<p>
														Experience -{' '}
														{doctor_experience}{' '}
														years
													</p>
												</div>
											</div>
										);
									})}
							</div>
						</div>
					</CommonCard>
					<CommonCard>
						<div className="doctor-info">
							{openDoctor && Object.keys(openDoctor).length > 0 && (
								<div className="details">
									<img
										src={
											doctorProfilePhoto
												? doctorProfilePhoto
												: defaultImage
										}
										alt="detail"
									/>
									<div className="doc-info">
										<p>Name - Dr. {doctorName}</p>
										<p>Expertise - {doctor_expertise}</p>
										<p>
											Experience - {doctor_experience}{' '}
											years
										</p>
										<p>Fees - INR {doctor_fees}/-</p>
									</div>
									{!boarding && (
										<>
											<hr />
											<span className="note">
												For a consultation please pay
												fees
											</span>
											<OrangeButton
												text={isCall ? 'Call' : 'Pay'}
												type="orange-button"
												click={
													isCall
														? handleCall
														: handlePay
												}
												loading={load}
											/>
										</>
									)}
								</div>
							)}
						</div>
					</CommonCard>
					{addDoctor && (
						<AddDoctor handleCloseDialog={handleCloseDialog} />
					)}
					{authToken && phone_number && (
						<DyteMeeting
							onInit={() => {}}
							clientId={phone_number}
							meetingConfig={{
								authToken,
								roomName,
							}}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default Doctors;
