import { useRef } from 'react';
export const TableOne = () => {
	return (
		<>
			<div className="element-box shadow-sm rounded p-4 mb-4">
				<h6 className="element-header">Questions per Product</h6>

				<div className="element-box-tp">
					<div className="controls-above-table"></div>

					<div className="table-responsive">
						<table className="table table-bordered table-lg table-v2 table-striped">
							<thead>
								<tr>
									<th className="text-center">
										<input className="form-control" type="checkbox" />
									</th>
									<th>Customer Name</th>
									<th>Country</th>
									<th>Order Total</th>
									<th>Referral</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>John Mayers</td>
									<td>
										<img alt="" src="img/flags-icons/us.png" width="25px" />
									</td>
									<td className="text-right">$245</td>
									<td>Organic</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>Mike Astone</td>
									<td>
										<img alt="" src="img/flags-icons/fr.png" width="25px" />
									</td>
									<td className="text-right">$154</td>
									<td>Organic</td>
									<td className="text-center">
										<div
											className="status-pill red"
											data-title="Cancelled"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>Kira Knight</td>
									<td>
										<img alt="" src="img/flags-icons/us.png" width="25px" />
									</td>
									<td className="text-right">$23</td>
									<td>Adwords</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>Jessica Bloom</td>
									<td>
										<img alt="" src="img/flags-icons/ca.png" width="25px" />
									</td>
									<td className="text-right">$112</td>
									<td>Organic</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>Gary Lineker</td>
									<td>
										<img alt="" src="img/flags-icons/ca.png" width="25px" />
									</td>
									<td className="text-right">$64</td>
									<td>Organic</td>
									<td className="text-center">
										<div
											className="status-pill yellow"
											data-title="Pending"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="controls-below-table pt-2">
						<div className="table-records-info">Showing records 1 - 5</div>
						<div className="table-records-pages">
							<ul>
								<li>
									<a href="#">Previous</a>
								</li>
								<li>
									<a className="current" href="#">
										1
									</a>
								</li>
								<li>
									<a href="#">2</a>
								</li>
								<li>
									<a href="#">3</a>
								</li>
								<li>
									<a href="#">4</a>
								</li>
								<li>
									<a href="#">Next</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const TabOne = () => {
	return (
		<>
			<div className="element-box">
				<h6 className="element-header">Questions per Product</h6>

				<div className="row gx-3 align-items-center">
					<p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">Name:</p>
					<p className="col-sm-9 text-3">Smith Rhodes</p>
				</div>
				<div className="row gx-3 align-items-center">
					<p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
						Date of Birth:
					</p>
					<p className="col-sm-9 text-3">12-09-1982</p>
				</div>
				<div className="row gx-3 align-items-baseline">
					<p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
						Address:
					</p>
					<p className="col-sm-9 text-3">
						4th Floor, Plot No.22, Above Public Park, 145 Murphy Canyon Rd,
						Suite 100-18,
						<br />
						San Ditego,
						<br />
						California - 22434,
						<br />
						United States.
					</p>
				</div>
			</div>

			<div
				id="edit-personal-details"
				className="modal fade "
				role="dialog"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title fw-400">Personal Details</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body p-4">
							<form id="personaldetails" method="post">
								<div className="row g-3">
									<div className="col-12 col-sm-6">
										<label for="firstName" className="form-label">
											First Name
										</label>
										<input
											type="text"
											value="Smith"
											className="form-control"
											data-bv-field="firstName"
											id="firstName"
											required=""
											placeholder="First Name"
										/>
									</div>
									<div className="col-12 col-sm-6">
										<label for="lastName" className="form-label">
											Last Name
										</label>
										<input
											type="text"
											value="Rhodes"
											className="form-control"
											data-bv-field="lastName"
											id="lastName"
											required=""
											placeholder="Last Name"
										/>
									</div>
									<div className="col-12">
										<label for="birthDate" className="form-label">
											Date of Birth
										</label>
										<div className="position-relative">
											<input
												id="birthDate"
												value="12-09-1982"
												type="text"
												className="form-control"
												required=""
												placeholder="Date of Birth"
											/>
											<span className="icon-inside">
												<i className="fas fa-calendar-alt"></i>
											</span>
										</div>
									</div>
								</div>

								<h3 className="text-5 fw-400 mt-4">Address</h3>
								<hr />
								<div className="row g-3">
									<div className="col-12">
										<label for="address" className="form-label">
											Address
										</label>
										<input
											type="text"
											value="4th Floor, Plot No.22, Above Public Park"
											className="form-control"
											data-bv-field="address"
											id="address"
											required=""
											placeholder="Address 1"
										/>
									</div>
									<div className="col-12 col-sm-6">
										<label for="city" className="form-label">
											City
										</label>
										<input
											id="city"
											value="San Ditego"
											type="text"
											className="form-control"
											required=""
											placeholder="City"
										/>
									</div>
									<div className="col-12 col-sm-6">
										<label for="input-zone" className="form-label">
											State
										</label>
										<select
											className="form-select"
											id="input-zone"
											name="zone_id"
										>
											<option value=""> --- Please Select --- </option>
											<option value="3613">Alabama</option>
											<option value="3614">Alaska</option>
											<option value="3615">American Samoa</option>
											<option value="3616">Arizona</option>
											<option value="3617">Arkansas</option>
											<option value="3618">Armed Forces Africa</option>
											<option value="3619">Armed Forces Americas</option>
											<option value="3620">Armed Forces Canada</option>
											<option value="3621">Armed Forces Europe</option>
											<option value="3622">Armed Forces Middle East</option>
											<option value="3623">Armed Forces Pacific</option>
											<option selected="selected" value="3624">
												California
											</option>
											<option value="3625">Colorado</option>
											<option value="3626">Connecticut</option>
											<option value="3627">Delaware</option>
											<option value="3628">District of Columbia</option>
											<option value="3629">
												Federated States Of Micronesia
											</option>
											<option value="3630">Florida</option>
											<option value="3631">Georgia</option>
											<option value="3632">Guam</option>
											<option value="3633">Hawaii</option>
											<option value="3634">Idaho</option>
											<option value="3635">Illinois</option>
											<option value="3636">Indiana</option>
											<option value="3637">Iowa</option>
											<option value="3638">Kansas</option>
											<option value="3639">Kentucky</option>
											<option value="3640">Louisiana</option>
											<option value="3641">Maine</option>
											<option value="3642">Marshall Islands</option>
											<option value="3643">Maryland</option>
											<option value="3644">Massachusetts</option>
											<option value="3645">Michigan</option>
											<option value="3646">Minnesota</option>
											<option value="3647">Mississippi</option>
											<option value="3648">Missouri</option>
											<option value="3649">Montana</option>
											<option value="3650">Nebraska</option>
											<option value="3651">Nevada</option>
											<option value="3652">New Hampshire</option>
											<option value="3653">New Jersey</option>
											<option value="3654">New Mexico</option>
											<option value="3655">New York</option>
											<option value="3656">North Carolina</option>
											<option value="3657">North Dakota</option>
											<option value="3658">Northern Mariana Islands</option>
											<option value="3659">Ohio</option>
											<option value="3660">Oklahoma</option>
											<option value="3661">Oregon</option>
											<option value="3662">Palau</option>
											<option value="3663">Pennsylvania</option>
											<option value="3664">Puerto Rico</option>
											<option value="3665">Rhode Island</option>
											<option value="3666">South Carolina</option>
											<option value="3667">South Dakota</option>
											<option value="3668">Tennessee</option>
											<option value="3669">Texas</option>
											<option value="3670">Utah</option>
											<option value="3671">Vermont</option>
											<option value="3672">Virgin Islands</option>
											<option value="3673">Virginia</option>
											<option value="3674">Washington</option>
											<option value="3675">West Virginia</option>
											<option value="3676">Wisconsin</option>
											<option value="3677">Wyoming</option>
										</select>
									</div>
									<div className="col-12 col-sm-6">
										<label for="zipCode" className="form-label">
											Zip Code
										</label>
										<input
											id="zipCode"
											value="22434"
											type="text"
											className="form-control"
											required=""
											placeholder="City"
										/>
									</div>
									<div className="col-12 col-sm-6">
										<label for="inputCountry" className="form-label">
											Country
										</label>
										<select
											className="form-select"
											id="inputCountry"
											name="country_id"
										>
											<option value=""> --- Please Select --- </option>
											<option value="244">Aaland Islands</option>
											<option value="1">Afghanistan</option>
											<option value="2">Albania</option>
											<option value="3">Algeria</option>
											<option value="4">American Samoa</option>
											<option value="5">Andorra</option>
											<option value="6">Angola</option>
											<option value="7">Anguilla</option>
											<option value="8">Antarctica</option>
											<option value="9">Antigua and Barbuda</option>
											<option value="10">Argentina</option>
											<option value="11">Armenia</option>
											<option value="12">Aruba</option>
											<option value="252">Ascension Island (British)</option>
											<option value="13">Australia</option>
											<option value="14">Austria</option>
											<option value="15">Azerbaijan</option>
											<option value="16">Bahamas</option>
											<option value="17">Bahrain</option>
											<option value="18">Bangladesh</option>
											<option value="19">Barbados</option>
											<option value="20">Belarus</option>
											<option value="21">Belgium</option>
											<option value="22">Belize</option>
											<option value="23">Benin</option>
											<option value="24">Bermuda</option>
											<option value="25">Bhutan</option>
											<option value="26">Bolivia</option>
											<option value="245">
												Bonaire, Sint Eustatius and Saba
											</option>
											<option value="27">Bosnia and Herzegovina</option>
											<option value="28">Botswana</option>
											<option value="29">Bouvet Island</option>
											<option value="30">Brazil</option>
											<option value="31">British Indian Ocean Territory</option>
											<option value="32">Brunei Darussalam</option>
											<option value="33">Bulgaria</option>
											<option value="34">Burkina Faso</option>
											<option value="35">Burundi</option>
											<option value="36">Cambodia</option>
											<option value="37">Cameroon</option>
											<option value="38">Canada</option>
											<option value="251">Canary Islands</option>
											<option value="39">Cape Verde</option>
											<option value="40">Cayman Islands</option>
											<option value="41">Central African Republic</option>
											<option value="42">Chad</option>
											<option value="43">Chile</option>
											<option value="44">China</option>
											<option value="45">Christmas Island</option>
											<option value="46">Cocos (Keeling) Islands</option>
											<option value="47">Colombia</option>
											<option value="48">Comoros</option>
											<option value="49">Congo</option>
											<option value="50">Cook Islands</option>
											<option value="51">Costa Rica</option>
											<option value="52">Cote D'Ivoire</option>
											<option value="53">Croatia</option>
											<option value="54">Cuba</option>
											<option value="246">Curacao</option>
											<option value="55">Cyprus</option>
											<option value="56">Czech Republic</option>
											<option value="237">Democratic Republic of Congo</option>
											<option value="57">Denmark</option>
											<option value="58">Djibouti</option>
											<option value="59">Dominica</option>
											<option value="60">Dominican Republic</option>
											<option value="61">East Timor</option>
											<option value="62">Ecuador</option>
											<option value="63">Egypt</option>
											<option value="64">El Salvador</option>
											<option value="65">Equatorial Guinea</option>
											<option value="66">Eritrea</option>
											<option value="67">Estonia</option>
											<option value="68">Ethiopia</option>
											<option value="69">Falkland Islands (Malvinas)</option>
											<option value="70">Faroe Islands</option>
											<option value="71">Fiji</option>
											<option value="72">Finland</option>
											<option value="74">France, Metropolitan</option>
											<option value="75">French Guiana</option>
											<option value="76">French Polynesia</option>
											<option value="77">French Southern Territories</option>
											<option value="126">FYROM</option>
											<option value="78">Gabon</option>
											<option value="79">Gambia</option>
											<option value="80">Georgia</option>
											<option value="81">Germany</option>
											<option value="82">Ghana</option>
											<option value="83">Gibraltar</option>
											<option value="84">Greece</option>
											<option value="85">Greenland</option>
											<option value="86">Grenada</option>
											<option value="87">Guadeloupe</option>
											<option value="88">Guam</option>
											<option value="89">Guatemala</option>
											<option value="256">Guernsey</option>
											<option value="90">Guinea</option>
											<option value="91">Guinea-Bissau</option>
											<option value="92">Guyana</option>
											<option value="93">Haiti</option>
											<option value="94">Heard and Mc Donald Islands</option>
											<option value="95">Honduras</option>
											<option value="96">Hong Kong</option>
											<option value="97">Hungary</option>
											<option value="98">Iceland</option>
											<option value="99">India</option>
											<option value="100">Indonesia</option>
											<option value="101">Iran (Islamic Republic of)</option>
											<option value="102">Iraq</option>
											<option value="103">Ireland</option>
											<option value="254">Isle of Man</option>
											<option value="104">Israel</option>
											<option value="105">Italy</option>
											<option value="106">Jamaica</option>
											<option value="107">Japan</option>
											<option value="257">Jersey</option>
											<option value="108">Jordan</option>
											<option value="109">Kazakhstan</option>
											<option value="110">Kenya</option>
											<option value="111">Kiribati</option>
											<option value="113">Korea, Republic of</option>
											<option value="253">Kosovo, Republic of</option>
											<option value="114">Kuwait</option>
											<option value="115">Kyrgyzstan</option>
											<option value="116">
												Lao People's Democratic Republic
											</option>
											<option value="117">Latvia</option>
											<option value="118">Lebanon</option>
											<option value="119">Lesotho</option>
											<option value="120">Liberia</option>
											<option value="121">Libyan Arab Jamahiriya</option>
											<option value="122">Liechtenstein</option>
											<option value="123">Lithuania</option>
											<option value="124">Luxembourg</option>
											<option value="125">Macau</option>
											<option value="127">Madagascar</option>
											<option value="128">Malawi</option>
											<option value="129">Malaysia</option>
											<option value="130">Maldives</option>
											<option value="131">Mali</option>
											<option value="132">Malta</option>
											<option value="133">Marshall Islands</option>
											<option value="134">Martinique</option>
											<option value="135">Mauritania</option>
											<option value="136">Mauritius</option>
											<option value="137">Mayotte</option>
											<option value="138">Mexico</option>
											<option value="139">
												Micronesia, Federated States of
											</option>
											<option value="140">Moldova, Republic of</option>
											<option value="141">Monaco</option>
											<option value="142">Mongolia</option>
											<option value="242">Montenegro</option>
											<option value="143">Montserrat</option>
											<option value="144">Morocco</option>
											<option value="145">Mozambique</option>
											<option value="146">Myanmar</option>
											<option value="147">Namibia</option>
											<option value="148">Nauru</option>
											<option value="149">Nepal</option>
											<option value="150">Netherlands</option>
											<option value="151">Netherlands Antilles</option>
											<option value="152">New Caledonia</option>
											<option value="153">New Zealand</option>
											<option value="154">Nicaragua</option>
											<option value="155">Niger</option>
											<option value="156">Nigeria</option>
											<option value="157">Niue</option>
											<option value="158">Norfolk Island</option>
											<option value="112">North Korea</option>
											<option value="159">Northern Mariana Islands</option>
											<option value="160">Norway</option>
											<option value="161">Oman</option>
											<option value="162">Pakistan</option>
											<option value="163">Palau</option>
											<option value="247">
												Palestinian Territory, Occupied
											</option>
											<option value="164">Panama</option>
											<option value="165">Papua New Guinea</option>
											<option value="166">Paraguay</option>
											<option value="167">Peru</option>
											<option value="168">Philippines</option>
											<option value="169">Pitcairn</option>
											<option value="170">Poland</option>
											<option value="171">Portugal</option>
											<option value="172">Puerto Rico</option>
											<option value="173">Qatar</option>
											<option value="174">Reunion</option>
											<option value="175">Romania</option>
											<option value="176">Russian Federation</option>
											<option value="177">Rwanda</option>
											<option value="178">Saint Kitts and Nevis</option>
											<option value="179">Saint Lucia</option>
											<option value="180">
												Saint Vincent and the Grenadines
											</option>
											<option value="181">Samoa</option>
											<option value="182">San Marino</option>
											<option value="183">Sao Tome and Principe</option>
											<option value="184">Saudi Arabia</option>
											<option value="185">Senegal</option>
											<option value="243">Serbia</option>
											<option value="186">Seychelles</option>
											<option value="187">Sierra Leone</option>
											<option value="188">Singapore</option>
											<option value="189">Slovak Republic</option>
											<option value="190">Slovenia</option>
											<option value="191">Solomon Islands</option>
											<option value="192">Somalia</option>
											<option value="193">South Africa</option>
											<option value="194">
												South Georgia &amp; South Sandwich Islands
											</option>
											<option value="248">South Sudan</option>
											<option value="195">Spain</option>
											<option value="196">Sri Lanka</option>
											<option value="249">St. Barthelemy</option>
											<option value="197">St. Helena</option>
											<option value="250">St. Martin (French part)</option>
											<option value="198">St. Pierre and Miquelon</option>
											<option value="199">Sudan</option>
											<option value="200">Suriname</option>
											<option value="201">
												Svalbard and Jan Mayen Islands
											</option>
											<option value="202">Swaziland</option>
											<option value="203">Sweden</option>
											<option value="204">Switzerland</option>
											<option value="205">Syrian Arab Republic</option>
											<option value="206">Taiwan</option>
											<option value="207">Tajikistan</option>
											<option value="208">Tanzania, United Republic of</option>
											<option value="209">Thailand</option>
											<option value="210">Togo</option>
											<option value="211">Tokelau</option>
											<option value="212">Tonga</option>
											<option value="213">Trinidad and Tobago</option>
											<option value="255">Tristan da Cunha</option>
											<option value="214">Tunisia</option>
											<option value="215">Turkey</option>
											<option value="216">Turkmenistan</option>
											<option value="217">Turks and Caicos Islands</option>
											<option value="218">Tuvalu</option>
											<option value="219">Uganda</option>
											<option value="220">Ukraine</option>
											<option value="221">United Arab Emirates</option>
											<option value="222">United Kingdom</option>
											<option selected="selected" value="223">
												United States
											</option>
											<option value="224">
												United States Minor Outlying Islands
											</option>
											<option value="225">Uruguay</option>
											<option value="226">Uzbekistan</option>
											<option value="227">Vanuatu</option>
											<option value="228">Vatican City State (Holy See)</option>
											<option value="229">Venezuela</option>
											<option value="230">Viet Nam</option>
											<option value="231">Virgin Islands (British)</option>
											<option value="232">Virgin Islands (U.S.)</option>
											<option value="233">Wallis and Futuna Islands</option>
											<option value="234">Western Sahara</option>
											<option value="235">Yemen</option>
											<option value="238">Zambia</option>
											<option value="239">Zimbabwe</option>
										</select>
									</div>
									<div className="col-12 mt-4 d-grid">
										<button className="btn btn-primary" type="submit">
											Save Changes
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<TableOne />

			<div
				id="edit-account-settings"
				className="modal fade "
				role="dialog"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title fw-400">Account Settings</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body p-4">
							<form id="accountSettings" method="post">
								<div className="row g-3">
									<div className="col-12">
										<label for="language" className="form-label">
											Language
										</label>
										<select
											className="form-select"
											id="language"
											name="language_id"
										>
											<option value="1">English (United States)</option>
											<option value="2">Spanish </option>
											<option value="3">Chinese</option>
											<option value="4">Russian</option>
										</select>
									</div>
									<div className="col-12">
										<label for="input-timezone" className="form-label">
											Time Zone
										</label>
										<select
											className="form-select"
											id="input-timezone"
											name="timezone_id"
										>
											<option value="-12">
												(GMT-12:00) International Date Line West
											</option>
											<option value="-11">
												(GMT-11:00) Midway Island, Samoa
											</option>
											<option value="-10">(GMT-10:00) Hawaii</option>
											<option value="-9">(GMT-09:00) Alaska</option>
											<option value="-8">
												(GMT-08:00) Pacific Time (US &amp; Canada)
											</option>
											<option value="-8">
												(GMT-08:00) Tijuana, Baja California
											</option>
											<option value="-7">(GMT-07:00) Arizona</option>
											<option value="-7">
												(GMT-07:00) Chihuahua, La Paz, Mazatlan
											</option>
											<option value="-7">
												(GMT-07:00) Mountain Time (US &amp; Canada)
											</option>
											<option selected="selected" value="-6">
												(GMT-06:00) Central America
											</option>
											<option value="-6">
												(GMT-06:00) Central Time (US &amp; Canada)
											</option>
											<option value="-6">
												(GMT-06:00) Guadalajara, Mexico City, Monterrey
											</option>
											<option value="-6">(GMT-06:00) Saskatchewan</option>
											<option value="-5">
												(GMT-05:00) Bogota, Lima, Quito, Rio Branco
											</option>
											<option value="-5">
												(GMT-05:00) Eastern Time (US &amp; Canada)
											</option>
											<option value="-5">(GMT-05:00) Indiana (East)</option>
											<option value="-4">
												(GMT-04:00) Atlantic Time (Canada)
											</option>
											<option value="-4">(GMT-04:00) Caracas, La Paz</option>
											<option value="-4">(GMT-04:00) Manaus</option>
											<option value="-4">(GMT-04:00) Santiago</option>
											<option value="-3.5">(GMT-03:30) Newfoundland</option>
											<option value="-3">(GMT-03:00) Brasilia</option>
											<option value="-3">
												(GMT-03:00) Buenos Aires, Georgetown
											</option>
											<option value="-3">(GMT-03:00) Greenland</option>
											<option value="-3">(GMT-03:00) Montevideo</option>
											<option value="-2">(GMT-02:00) Mid-Atlantic</option>
											<option value="-1">(GMT-01:00) Cape Verde Is.</option>
											<option value="-1">(GMT-01:00) Azores</option>
											<option value="0">
												(GMT+00:00) Casablanca, Monrovia, Reykjavik
											</option>
											<option value="0">
												(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh,
												Lisbon, London
											</option>
											<option value="1">
												(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm,
												Vienna
											</option>
											<option value="1">
												(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana,
												Prague
											</option>
											<option value="1">
												(GMT+01:00) Brussels, Copenhagen, Madrid, Paris
											</option>
											<option value="1">
												(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb
											</option>
											<option value="1">(GMT+01:00) West Central Africa</option>
											<option value="2">(GMT+02:00) Amman</option>
											<option value="2">
												(GMT+02:00) Athens, Bucharest, Istanbul
											</option>
											<option value="2">(GMT+02:00) Beirut</option>
											<option value="2">(GMT+02:00) Cairo</option>
											<option value="2">(GMT+02:00) Harare, Pretoria</option>
											<option value="2">
												(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn,
												Vilnius
											</option>
											<option value="2">(GMT+02:00) Jerusalem</option>
											<option value="2">(GMT+02:00) Minsk</option>
											<option value="2">(GMT+02:00) Windhoek</option>
											<option value="3">
												(GMT+03:00) Kuwait, Riyadh, Baghdad
											</option>
											<option value="3">
												(GMT+03:00) Moscow, St. Petersburg, Volgograd
											</option>
											<option value="3">(GMT+03:00) Nairobi</option>
											<option value="3">(GMT+03:00) Tbilisi</option>
											<option value="3.5">(GMT+03:30) Tehran</option>
											<option value="4">(GMT+04:00) Abu Dhabi, Muscat</option>
											<option value="4">(GMT+04:00) Baku</option>
											<option value="4">(GMT+04:00) Yerevan</option>
											<option value="4.5">(GMT+04:30) Kabul</option>
											<option value="5">(GMT+05:00) Yekaterinburg</option>
											<option value="5">
												(GMT+05:00) Islamabad, Karachi, Tashkent
											</option>
											<option value="5.5">
												(GMT+05:30) Sri Jayawardenapura
											</option>
											<option value="5.5">
												(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
											</option>
											<option value="5.75">(GMT+05:45) Kathmandu</option>
											<option value="6">(GMT+06:00) Almaty, Novosibirsk</option>
											<option value="6">(GMT+06:00) Astana, Dhaka</option>
											<option value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
											<option value="7">
												(GMT+07:00) Bangkok, Hanoi, Jakarta
											</option>
											<option value="7">(GMT+07:00) Krasnoyarsk</option>
											<option value="8">
												(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi
											</option>
											<option value="8">
												(GMT+08:00) Kuala Lumpur, Singapore
											</option>
											<option value="8">
												(GMT+08:00) Irkutsk, Ulaan Bataar
											</option>
											<option value="8">(GMT+08:00) Perth</option>
											<option value="8">(GMT+08:00) Taipei</option>
											<option value="9">
												(GMT+09:00) Osaka, Sapporo, Tokyo
											</option>
											<option value="9">(GMT+09:00) Seoul</option>
											<option value="9">(GMT+09:00) Yakutsk</option>
											<option value="9.5">(GMT+09:30) Adelaide</option>
											<option value="9.5">(GMT+09:30) Darwin</option>
											<option value="10">(GMT+10:00) Brisbane</option>
											<option value="10">
												(GMT+10:00) Canberra, Melbourne, Sydney
											</option>
											<option value="10">(GMT+10:00) Hobart</option>
											<option value="10">(GMT+10:00) Guam, Port Moresby</option>
											<option value="10">(GMT+10:00) Vladivostok</option>
											<option value="11">
												(GMT+11:00) Magadan, Solomon Is., New Caledonia
											</option>
											<option value="12">
												(GMT+12:00) Auckland, Wellington
											</option>
											<option value="12">
												(GMT+12:00) Fiji, Kamchatka, Marshall Is.
											</option>
											<option value="13">(GMT+13:00) Nuku'alofa</option>
										</select>
									</div>
									<div className="col-12">
										<label for="accountStatus" className="form-label">
											Account Status
										</label>
										<select
											className="form-select"
											id="accountStatus"
											name="language_id"
										>
											<option value="1">Active</option>
											<option value="2">In Active</option>
										</select>
									</div>
									<div className="col-12 d-grid mt-4">
										<button className="btn btn-primary" type="submit">
											Save Changes
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div className="element-box shadow-sm rounded p-4 mb-4">
				<h3 className="text-5 fw-400 d-flex align-items-center mb-4">
					Email Addresses
					<a
						href="#edit-email"
						data-bs-toggle="modal"
						className="ms-auto text-2 text-uppercase btn-link"
					>
						<span className="me-1">
							<i className="fas fa-edit"></i>
						</span>
						Edit
					</a>
				</h3>
				<hr className="mx-n4 mb-4" />
				<div className="row gx-3 align-items-center">
					<p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
						Email ID:
					</p>
					<p className="col-sm-9 text-3 d-sm-inline-flex d-md-flex align-items-center">
						smithrhodes1982@gmail.com
						<span className="badge bg-info text-1 fw-500 rounded-pill px-2 py-1 ms-2">
							Primary
						</span>
					</p>
				</div>
				<div className="row gx-3 align-items-center">
					<p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
						Email ID:
					</p>
					<p className="col-sm-9 text-3">smith.rhodes@outlook.com</p>
				</div>
			</div>

			<div
				id="edit-email"
				className="modal fade"
				role="dialog"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title fw-400">Email Addresses</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body p-4">
							<form id="emailAddresses" method="post">
								<div className="mb-3">
									<label
										for="emailID"
										className="form-label d-inline-flex align-items-center"
									>
										Email ID
										<span className="badge bg-info text-1 fw-500 rounded-pill px-2 py-1 ms-2">
											Primary
										</span>
									</label>
									<input
										type="text"
										value="smithrhodes1982@gmail.com"
										className="form-control"
										data-bv-field="emailid"
										id="emailID"
										required=""
										placeholder="Email ID"
									/>
								</div>
								<div className="mb-3">
									<label for="emailID2" className="form-label">
										Email ID 2 -{' '}
										<a className="btn-link text-uppercase text-1" href="#">
											Make Primary
										</a>
									</label>
									<div className="input-group">
										<input
											type="text"
											value="smith.rhodes@outlook.com"
											className="form-control"
											data-bv-field="emailid2"
											id="emailID2"
											required=""
											placeholder="Email ID"
										/>
										<a
											href=""
											data-bs-toggle="tooltip"
											title=""
											className="input-group-text text-muted text-2"
											data-bs-original-title="Remove"
											aria-label="Remove"
										>
											<i className="fas fa-times"></i>
										</a>
									</div>
								</div>
								<a
									className="btn-link text-uppercase d-flex align-items-center text-1 float-end mb-3"
									href="#"
								>
									<span className="text-3 me-1">
										<i className="fas fa-plus-circle"></i>
									</span>
									Add another email
								</a>
								<div className="d-grid w-100">
									<button className="btn btn-primary" type="submit">
										Save Changes
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div className="element-box shadow-sm rounded p-4 mb-4">
				<h3 className="text-5 fw-400 d-flex align-items-center mb-4">
					Phone
					<a
						href="#edit-phone"
						data-bs-toggle="modal"
						className="ms-auto text-2 text-uppercase btn-link"
					>
						<span className="me-1">
							<i className="fas fa-edit"></i>
						</span>
						Edit
					</a>
				</h3>
				<hr className="mx-n4 mb-4" />
				<div className="row gx-3 align-items-center">
					<p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
						Mobile:
					</p>
					<p className="col-sm-9 text-3 align-items-center d-sm-inline-flex d-md-flex">
						+1 202-555-0125
						<span className="badge bg-info text-1 fw-500 rounded-pill px-2 py-1 ms-2">
							Primary
						</span>
					</p>
				</div>
				<div className="row gx-3 align-items-center">
					<p className="col-sm-3 text-muted text-sm-end mb-0 mb-sm-3">
						Mobile:
					</p>
					<p className="col-sm-9 text-3">+1 303-666-0512</p>
				</div>
			</div>

			<div
				id="edit-phone"
				className="modal fade "
				role="dialog"
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title fw-400">Phone</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body p-4">
							<form id="phone" method="post">
								<div className="mb-3">
									<label
										for="mobileNumber"
										className="form-label d-inline-flex align-items-center"
									>
										Mobile{' '}
										<span className="badge bg-info text-1 fw-500 rounded-pill px-2 py-1 ms-2">
											Primary
										</span>
									</label>
									<div className="input-group">
										<div className="input-group-text p-0">
											<select
												className="form-select border-0 bg-transparent"
												id="selectedCountry"
												name="selectedCountry"
											>
												<option value="AD,376">AD +376</option>
												<option value="AE,971">AE +971</option>
												<option value="AF,93">AF +93</option>
												<option value="AG,1">AG +1</option>
												<option value="AI,1">AI +1</option>
												<option value="AL,355">AL +355</option>
												<option value="AM,374">AM +374</option>
												<option value="AN,599">AN +599</option>
												<option value="AO,244">AO +244</option>
												<option value="AR,54">AR +54</option>
												<option value="AS,1">AS +1</option>
												<option value="AT,43">AT +43</option>
												<option value="AU,61">AU +61</option>
												<option value="AW,297">AW +297</option>
												<option value="AX,358">AX +358</option>
												<option value="AZ,994">AZ +994</option>
												<option value="BA,387">BA +387</option>
												<option value="BB,1">BB +1</option>
												<option value="BD,880">BD +880</option>
												<option value="BE,32">BE +32</option>
												<option value="BF,226">BF +226</option>
												<option value="BG,359">BG +359</option>
												<option value="BH,973">BH +973</option>
												<option value="BI,257">BI +257</option>
												<option value="BJ,229">BJ +229</option>
												<option value="BL,590">BL +590</option>
												<option value="BM,1">BM +1</option>
												<option value="BN,673">BN +673</option>
												<option value="BO,591">BO +591</option>
												<option value="BQ,599">BQ +599</option>
												<option value="BR,55">BR +55</option>
												<option value="BS,1">BS +1</option>
												<option value="BT,975">BT +975</option>
												<option value="BW,267">BW +267</option>
												<option value="BY,375">BY +375</option>
												<option value="BZ,501">BZ +501</option>
												<option value="CA,1">CA +1</option>
												<option value="CC,61">CC +61</option>
												<option value="CD,243">CD +243</option>
												<option value="CF,236">CF +236</option>
												<option value="CG,242">CG +242</option>
												<option value="CH,41">CH +41</option>
												<option value="CI,225">CI +225</option>
												<option value="CK,682">CK +682</option>
												<option value="CL,56">CL +56</option>
												<option value="CM,237">CM +237</option>
												<option value="CN,86">CN +86</option>
												<option value="CO,57">CO +57</option>
												<option value="CR,506">CR +506</option>
												<option value="CU,53">CU +53</option>
												<option value="CV,238">CV +238</option>
												<option value="CW,599">CW +599</option>
												<option value="CY,357">CY +357</option>
												<option value="CZ,420">CZ +420</option>
												<option value="DE,49">DE +49</option>
												<option value="DJ,253">DJ +253</option>
												<option value="DK,45">DK +45</option>
												<option value="DM,1">DM +1</option>
												<option value="DO,1">DO +1</option>
												<option value="DZ,213">DZ +213</option>
												<option value="EC,593">EC +593</option>
												<option value="EE,372">EE +372</option>
												<option value="EG,20">EG +20</option>
												<option value="ER,291">ER +291</option>
												<option value="ES,34">ES +34</option>
												<option value="ET,251">ET +251</option>
												<option value="FI,358">FI +358</option>
												<option value="FJ,679">FJ +679</option>
												<option value="FK,500">FK +500</option>
												<option value="FM,691">FM +691</option>
												<option value="FO,298">FO +298</option>
												<option value="FR,33">FR +33</option>
												<option value="GA,241">GA +241</option>
												<option value="GB,44">GB +44</option>
												<option value="GD,1">GD +1</option>
												<option value="GE,995">GE +995</option>
												<option value="GF,594">GF +594</option>
												<option value="GG,44">GG +44</option>
												<option value="GH,233">GH +233</option>
												<option value="GI,350">GI +350</option>
												<option value="GL,299">GL +299</option>
												<option value="GM,220">GM +220</option>
												<option value="GN,224">GN +224</option>
												<option value="GP,590">GP +590</option>
												<option value="GQ,240">GQ +240</option>
												<option value="GR,30">GR +30</option>
												<option value="GT,502">GT +502</option>
												<option value="GU,1">GU +1</option>
												<option value="GW,245">GW +245</option>
												<option value="GY,592">GY +592</option>
												<option value="HK,852">HK +852</option>
												<option value="HN,504">HN +504</option>
												<option value="HR,385">HR +385</option>
												<option value="HT,509">HT +509</option>
												<option value="HU,36">HU +36</option>
												<option value="ID,62">ID +62</option>
												<option value="IE,353">IE +353</option>
												<option value="IL,972">IL +972</option>
												<option value="IM,44">IM +44</option>
												<option value="IN,91">IN +91</option>
												<option value="IO,246">IO +246</option>
												<option value="IQ,964">IQ +964</option>
												<option value="IR,98">IR +98</option>
												<option value="IS,354">IS +354</option>
												<option value="IT,39">IT +39</option>
												<option value="JE,44">JE +44</option>
												<option value="JM,1">JM +1</option>
												<option value="JO,962">JO +962</option>
												<option value="JP,81">JP +81</option>
												<option value="KE,254">KE +254</option>
												<option value="KG,996">KG +996</option>
												<option value="KH,855">KH +855</option>
												<option value="KI,686">KI +686</option>
												<option value="KM,269">KM +269</option>
												<option value="KN,1">KN +1</option>
												<option value="KP,850">KP +850</option>
												<option value="KR,82">KR +82</option>
												<option value="KW,965">KW +965</option>
												<option value="KY,1">KY +1</option>
												<option value="KZ,7">KZ +7</option>
												<option value="LA,856">LA +856</option>
												<option value="LB,961">LB +961</option>
												<option value="LC,1">LC +1</option>
												<option value="LI,423">LI +423</option>
												<option value="LK,94">LK +94</option>
												<option value="LR,231">LR +231</option>
												<option value="LS,266">LS +266</option>
												<option value="LT,370">LT +370</option>
												<option value="LU,352">LU +352</option>
												<option value="LV,371">LV +371</option>
												<option value="LY,218">LY +218</option>
												<option value="MA,212">MA +212</option>
												<option value="MC,377">MC +377</option>
												<option value="MD,373">MD +373</option>
												<option value="ME,382">ME +382</option>
												<option value="MF,590">MF +590</option>
												<option value="MG,261">MG +261</option>
												<option value="MH,692">MH +692</option>
												<option value="MK,389">MK +389</option>
												<option value="ML,223">ML +223</option>
												<option value="MM,95">MM +95</option>
												<option value="MN,976">MN +976</option>
												<option value="MO,853">MO +853</option>
												<option value="MP,1">MP +1</option>
												<option value="MQ,596">MQ +596</option>
												<option value="MR,222">MR +222</option>
												<option value="MS,1">MS +1</option>
												<option value="MT,356">MT +356</option>
												<option value="MU,230">MU +230</option>
												<option value="MV,960">MV +960</option>
												<option value="MW,265">MW +265</option>
												<option value="MX,52">MX +52</option>
												<option value="MY,60">MY +60</option>
												<option value="MZ,258">MZ +258</option>
												<option value="NA,264">NA +264</option>
												<option value="NC,687">NC +687</option>
												<option value="NE,227">NE +227</option>
												<option value="NF,672">NF +672</option>
												<option value="NG,234">NG +234</option>
												<option value="NI,505">NI +505</option>
												<option value="NL,31">NL +31</option>
												<option value="NO,47">NO +47</option>
												<option value="NP,977">NP +977</option>
												<option value="NR,674">NR +674</option>
												<option value="NU,683">NU +683</option>
												<option value="NZ,64">NZ +64</option>
												<option value="OM,968">OM +968</option>
												<option value="PA,507">PA +507</option>
												<option value="PE,51">PE +51</option>
												<option value="PF,689">PF +689</option>
												<option value="PG,675">PG +675</option>
												<option value="PH,63">PH +63</option>
												<option value="PK,92">PK +92</option>
												<option value="PL,48">PL +48</option>
												<option value="PM,508">PM +508</option>
												<option value="PN,64">PN +64</option>
												<option value="PR,1">PR +1</option>
												<option value="PS,970">PS +970</option>
												<option value="PT,351">PT +351</option>
												<option value="PW,680">PW +680</option>
												<option value="PY,595">PY +595</option>
												<option value="QA,974">QA +974</option>
												<option value="RE,262">RE +262</option>
												<option value="RO,40">RO +40</option>
												<option value="RS,381">RS +381</option>
												<option value="RU,7">RU +7</option>
												<option value="RW,250">RW +250</option>
												<option value="SA,966">SA +966</option>
												<option value="SB,677">SB +677</option>
												<option value="SC,248">SC +248</option>
												<option value="SD,249">SD +249</option>
												<option value="SE,46">SE +46</option>
												<option value="SG,65">SG +65</option>
												<option value="SH,290">SH +290</option>
												<option value="SI,386">SI +386</option>
												<option value="SJ,47">SJ +47</option>
												<option value="SK,421">SK +421</option>
												<option value="SL,232">SL +232</option>
												<option value="SM,378">SM +378</option>
												<option value="SN,221">SN +221</option>
												<option value="SO,252">SO +252</option>
												<option value="SR,597">SR +597</option>
												<option value="SS,211">SS +211</option>
												<option value="ST,239">ST +239</option>
												<option value="SV,503">SV +503</option>
												<option value="SX,1">SX +1</option>
												<option value="SY,963">SY +963</option>
												<option value="SZ,268">SZ +268</option>
												<option value="TC,1">TC +1</option>
												<option value="TD,235">TD +235</option>
												<option value="TG,228">TG +228</option>
												<option value="TH,66">TH +66</option>
												<option value="TJ,992">TJ +992</option>
												<option value="TK,690">TK +690</option>
												<option value="TL,670">TL +670</option>
												<option value="TM,993">TM +993</option>
												<option value="TN,216">TN +216</option>
												<option value="TO,676">TO +676</option>
												<option value="TR,90">TR +90</option>
												<option value="TT,1">TT +1</option>
												<option value="TV,688">TV +688</option>
												<option value="TW,886">TW +886</option>
												<option value="TZ,255">TZ +255</option>
												<option value="UA,380">UA +380</option>
												<option value="UG,256">UG +256</option>
												<option value="US,1">US +1</option>
												<option value="UY,598">UY +598</option>
												<option value="UZ,998">UZ +998</option>
												<option value="VA,39">VA +39</option>
												<option value="VC,1">VC +1</option>
												<option value="VE,58">VE +58</option>
												<option value="VG,1">VG +1</option>
												<option value="VI,1">VI +1</option>
												<option value="VN,84">VN +84</option>
												<option value="VU,678">VU +678</option>
												<option value="WF,681">WF +681</option>
												<option value="WS,685">WS +685</option>
												<option value="YE,967">YE +967</option>
												<option value="YT,262">YT +262</option>
												<option value="ZA,27">ZA +27</option>
												<option value="ZM,260">ZM +260</option>
												<option value="ZW,263">ZW +263</option>
											</select>
										</div>
										<input
											type="text"
											value="2025550125"
											className="form-control"
											data-bv-field="mobilenumber"
											id="mobileNumber"
											required=""
											placeholder="Mobile Number"
										/>
									</div>
								</div>
								<div className="mb-3">
									<label for="mobileNumber2" className="form-label">
										Mobile 2 -{' '}
										<a className="btn-link text-uppercase text-1" href="#">
											Make Primary
										</a>
									</label>
									<div className="input-group">
										<div className="input-group-text p-0">
											<select
												className="form-select border-0 bg-transparent"
												id="selectedCountry"
												name="selectedCountry"
											>
												<option value="AD,376">AD +376</option>
												<option value="AE,971">AE +971</option>
												<option value="AF,93">AF +93</option>
												<option value="AG,1">AG +1</option>
												<option value="AI,1">AI +1</option>
												<option value="AL,355">AL +355</option>
												<option value="AM,374">AM +374</option>
												<option value="AN,599">AN +599</option>
												<option value="AO,244">AO +244</option>
												<option value="AR,54">AR +54</option>
												<option value="AS,1">AS +1</option>
												<option value="AT,43">AT +43</option>
												<option value="AU,61">AU +61</option>
												<option value="AW,297">AW +297</option>
												<option value="AX,358">AX +358</option>
												<option value="AZ,994">AZ +994</option>
												<option value="BA,387">BA +387</option>
												<option value="BB,1">BB +1</option>
												<option value="BD,880">BD +880</option>
												<option value="BE,32">BE +32</option>
												<option value="BF,226">BF +226</option>
												<option value="BG,359">BG +359</option>
												<option value="BH,973">BH +973</option>
												<option value="BI,257">BI +257</option>
												<option value="BJ,229">BJ +229</option>
												<option value="BL,590">BL +590</option>
												<option value="BM,1">BM +1</option>
												<option value="BN,673">BN +673</option>
												<option value="BO,591">BO +591</option>
												<option value="BQ,599">BQ +599</option>
												<option value="BR,55">BR +55</option>
												<option value="BS,1">BS +1</option>
												<option value="BT,975">BT +975</option>
												<option value="BW,267">BW +267</option>
												<option value="BY,375">BY +375</option>
												<option value="BZ,501">BZ +501</option>
												<option value="CA,1">CA +1</option>
												<option value="CC,61">CC +61</option>
												<option value="CD,243">CD +243</option>
												<option value="CF,236">CF +236</option>
												<option value="CG,242">CG +242</option>
												<option value="CH,41">CH +41</option>
												<option value="CI,225">CI +225</option>
												<option value="CK,682">CK +682</option>
												<option value="CL,56">CL +56</option>
												<option value="CM,237">CM +237</option>
												<option value="CN,86">CN +86</option>
												<option value="CO,57">CO +57</option>
												<option value="CR,506">CR +506</option>
												<option value="CU,53">CU +53</option>
												<option value="CV,238">CV +238</option>
												<option value="CW,599">CW +599</option>
												<option value="CY,357">CY +357</option>
												<option value="CZ,420">CZ +420</option>
												<option value="DE,49">DE +49</option>
												<option value="DJ,253">DJ +253</option>
												<option value="DK,45">DK +45</option>
												<option value="DM,1">DM +1</option>
												<option value="DO,1">DO +1</option>
												<option value="DZ,213">DZ +213</option>
												<option value="EC,593">EC +593</option>
												<option value="EE,372">EE +372</option>
												<option value="EG,20">EG +20</option>
												<option value="ER,291">ER +291</option>
												<option value="ES,34">ES +34</option>
												<option value="ET,251">ET +251</option>
												<option value="FI,358">FI +358</option>
												<option value="FJ,679">FJ +679</option>
												<option value="FK,500">FK +500</option>
												<option value="FM,691">FM +691</option>
												<option value="FO,298">FO +298</option>
												<option value="FR,33">FR +33</option>
												<option value="GA,241">GA +241</option>
												<option value="GB,44">GB +44</option>
												<option value="GD,1">GD +1</option>
												<option value="GE,995">GE +995</option>
												<option value="GF,594">GF +594</option>
												<option value="GG,44">GG +44</option>
												<option value="GH,233">GH +233</option>
												<option value="GI,350">GI +350</option>
												<option value="GL,299">GL +299</option>
												<option value="GM,220">GM +220</option>
												<option value="GN,224">GN +224</option>
												<option value="GP,590">GP +590</option>
												<option value="GQ,240">GQ +240</option>
												<option value="GR,30">GR +30</option>
												<option value="GT,502">GT +502</option>
												<option value="GU,1">GU +1</option>
												<option value="GW,245">GW +245</option>
												<option value="GY,592">GY +592</option>
												<option value="HK,852">HK +852</option>
												<option value="HN,504">HN +504</option>
												<option value="HR,385">HR +385</option>
												<option value="HT,509">HT +509</option>
												<option value="HU,36">HU +36</option>
												<option value="ID,62">ID +62</option>
												<option value="IE,353">IE +353</option>
												<option value="IL,972">IL +972</option>
												<option value="IM,44">IM +44</option>
												<option value="IN,91">IN +91</option>
												<option value="IO,246">IO +246</option>
												<option value="IQ,964">IQ +964</option>
												<option value="IR,98">IR +98</option>
												<option value="IS,354">IS +354</option>
												<option value="IT,39">IT +39</option>
												<option value="JE,44">JE +44</option>
												<option value="JM,1">JM +1</option>
												<option value="JO,962">JO +962</option>
												<option value="JP,81">JP +81</option>
												<option value="KE,254">KE +254</option>
												<option value="KG,996">KG +996</option>
												<option value="KH,855">KH +855</option>
												<option value="KI,686">KI +686</option>
												<option value="KM,269">KM +269</option>
												<option value="KN,1">KN +1</option>
												<option value="KP,850">KP +850</option>
												<option value="KR,82">KR +82</option>
												<option value="KW,965">KW +965</option>
												<option value="KY,1">KY +1</option>
												<option value="KZ,7">KZ +7</option>
												<option value="LA,856">LA +856</option>
												<option value="LB,961">LB +961</option>
												<option value="LC,1">LC +1</option>
												<option value="LI,423">LI +423</option>
												<option value="LK,94">LK +94</option>
												<option value="LR,231">LR +231</option>
												<option value="LS,266">LS +266</option>
												<option value="LT,370">LT +370</option>
												<option value="LU,352">LU +352</option>
												<option value="LV,371">LV +371</option>
												<option value="LY,218">LY +218</option>
												<option value="MA,212">MA +212</option>
												<option value="MC,377">MC +377</option>
												<option value="MD,373">MD +373</option>
												<option value="ME,382">ME +382</option>
												<option value="MF,590">MF +590</option>
												<option value="MG,261">MG +261</option>
												<option value="MH,692">MH +692</option>
												<option value="MK,389">MK +389</option>
												<option value="ML,223">ML +223</option>
												<option value="MM,95">MM +95</option>
												<option value="MN,976">MN +976</option>
												<option value="MO,853">MO +853</option>
												<option value="MP,1">MP +1</option>
												<option value="MQ,596">MQ +596</option>
												<option value="MR,222">MR +222</option>
												<option value="MS,1">MS +1</option>
												<option value="MT,356">MT +356</option>
												<option value="MU,230">MU +230</option>
												<option value="MV,960">MV +960</option>
												<option value="MW,265">MW +265</option>
												<option value="MX,52">MX +52</option>
												<option value="MY,60">MY +60</option>
												<option value="MZ,258">MZ +258</option>
												<option value="NA,264">NA +264</option>
												<option value="NC,687">NC +687</option>
												<option value="NE,227">NE +227</option>
												<option value="NF,672">NF +672</option>
												<option value="NG,234">NG +234</option>
												<option value="NI,505">NI +505</option>
												<option value="NL,31">NL +31</option>
												<option value="NO,47">NO +47</option>
												<option value="NP,977">NP +977</option>
												<option value="NR,674">NR +674</option>
												<option value="NU,683">NU +683</option>
												<option value="NZ,64">NZ +64</option>
												<option value="OM,968">OM +968</option>
												<option value="PA,507">PA +507</option>
												<option value="PE,51">PE +51</option>
												<option value="PF,689">PF +689</option>
												<option value="PG,675">PG +675</option>
												<option value="PH,63">PH +63</option>
												<option value="PK,92">PK +92</option>
												<option value="PL,48">PL +48</option>
												<option value="PM,508">PM +508</option>
												<option value="PN,64">PN +64</option>
												<option value="PR,1">PR +1</option>
												<option value="PS,970">PS +970</option>
												<option value="PT,351">PT +351</option>
												<option value="PW,680">PW +680</option>
												<option value="PY,595">PY +595</option>
												<option value="QA,974">QA +974</option>
												<option value="RE,262">RE +262</option>
												<option value="RO,40">RO +40</option>
												<option value="RS,381">RS +381</option>
												<option value="RU,7">RU +7</option>
												<option value="RW,250">RW +250</option>
												<option value="SA,966">SA +966</option>
												<option value="SB,677">SB +677</option>
												<option value="SC,248">SC +248</option>
												<option value="SD,249">SD +249</option>
												<option value="SE,46">SE +46</option>
												<option value="SG,65">SG +65</option>
												<option value="SH,290">SH +290</option>
												<option value="SI,386">SI +386</option>
												<option value="SJ,47">SJ +47</option>
												<option value="SK,421">SK +421</option>
												<option value="SL,232">SL +232</option>
												<option value="SM,378">SM +378</option>
												<option value="SN,221">SN +221</option>
												<option value="SO,252">SO +252</option>
												<option value="SR,597">SR +597</option>
												<option value="SS,211">SS +211</option>
												<option value="ST,239">ST +239</option>
												<option value="SV,503">SV +503</option>
												<option value="SX,1">SX +1</option>
												<option value="SY,963">SY +963</option>
												<option value="SZ,268">SZ +268</option>
												<option value="TC,1">TC +1</option>
												<option value="TD,235">TD +235</option>
												<option value="TG,228">TG +228</option>
												<option value="TH,66">TH +66</option>
												<option value="TJ,992">TJ +992</option>
												<option value="TK,690">TK +690</option>
												<option value="TL,670">TL +670</option>
												<option value="TM,993">TM +993</option>
												<option value="TN,216">TN +216</option>
												<option value="TO,676">TO +676</option>
												<option value="TR,90">TR +90</option>
												<option value="TT,1">TT +1</option>
												<option value="TV,688">TV +688</option>
												<option value="TW,886">TW +886</option>
												<option value="TZ,255">TZ +255</option>
												<option value="UA,380">UA +380</option>
												<option value="UG,256">UG +256</option>
												<option value="US,1">US +1</option>
												<option value="UY,598">UY +598</option>
												<option value="UZ,998">UZ +998</option>
												<option value="VA,39">VA +39</option>
												<option value="VC,1">VC +1</option>
												<option value="VE,58">VE +58</option>
												<option value="VG,1">VG +1</option>
												<option value="VI,1">VI +1</option>
												<option value="VN,84">VN +84</option>
												<option value="VU,678">VU +678</option>
												<option value="WF,681">WF +681</option>
												<option value="WS,685">WS +685</option>
												<option value="YE,967">YE +967</option>
												<option value="YT,262">YT +262</option>
												<option value="ZA,27">ZA +27</option>
												<option value="ZM,260">ZM +260</option>
												<option value="ZW,263">ZW +263</option>
											</select>
										</div>
										<input
											type="text"
											value="3036660512"
											className="form-control"
											data-bv-field="mobilenumber2"
											id="mobileNumber2"
											required=""
											placeholder="Mobile Number"
										/>
										<a
											href=""
											data-bs-toggle="tooltip"
											title=""
											className="input-group-text text-2"
											data-bs-original-title="Remove"
											aria-label="Remove"
										>
											<i className="fas fa-times"></i>
										</a>
									</div>
								</div>
								<a
									className="btn-link text-uppercase d-flex align-items-center text-1 float-end mb-3"
									href="#"
								>
									<span className="text-3 me-1">
										<i className="fas fa-plus-circle"></i>
									</span>
									Add another Phone
								</a>
								<div className="d-grid w-100">
									<button className="btn btn-primary" type="submit">
										Save Changes
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export const TabTwo = () => {
	return (
		<>
			<div className="element-box shadow-sm rounded p-4 mb-4">
				<h6 className="element-header">Questions per Product</h6>

				<div className="element-box-tp">
					<div className="controls-above-table"></div>

					<div className="table-responsive">
						<table className="table table-bordered table-lg table-v2 table-striped">
							<thead>
								<tr>
									<th className="text-center">
										<input className="form-control" type="checkbox" />
									</th>
									<th>Customer Name</th>
									<th>Country</th>
									<th>Order Total</th>
									<th>Referral</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>John Mayers</td>
									<td>
										<img alt="" src="img/flags-icons/us.png" width="25px" />
									</td>
									<td className="text-right">$245</td>
									<td>Organic</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>Mike Astone</td>
									<td>
										<img alt="" src="img/flags-icons/fr.png" width="25px" />
									</td>
									<td className="text-right">$154</td>
									<td>Organic</td>
									<td className="text-center">
										<div
											className="status-pill red"
											data-title="Cancelled"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>Kira Knight</td>
									<td>
										<img alt="" src="img/flags-icons/us.png" width="25px" />
									</td>
									<td className="text-right">$23</td>
									<td>Adwords</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>Jessica Bloom</td>
									<td>
										<img alt="" src="img/flags-icons/ca.png" width="25px" />
									</td>
									<td className="text-right">$112</td>
									<td>Organic</td>
									<td className="text-center">
										<div
											className="status-pill green"
											data-title="Complete"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
								<tr>
									<td className="text-center">
										<input className="form-control" type="checkbox" />
									</td>
									<td>Gary Lineker</td>
									<td>
										<img alt="" src="img/flags-icons/ca.png" width="25px" />
									</td>
									<td className="text-right">$64</td>
									<td>Organic</td>
									<td className="text-center">
										<div
											className="status-pill yellow"
											data-title="Pending"
											data-toggle="tooltip"
											data-original-title=""
											title=""
										></div>
									</td>
									<td className="row-actions">
										<a href="#">
											<i className="os-icon os-icon-ui-49"></i>
										</a>
										<a href="#">
											<i className="os-icon os-icon-grid-10"></i>
										</a>
										<a className="danger" href="#">
											<i className="os-icon os-icon-ui-15"></i>
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div className="controls-below-table pt-2">
						<div className="table-records-info">Showing records 1 - 5</div>
						<div className="table-records-pages">
							<ul>
								<li>
									<a href="#">Previous</a>
								</li>
								<li>
									<a className="current" href="#">
										1
									</a>
								</li>
								<li>
									<a href="#">2</a>
								</li>
								<li>
									<a href="#">3</a>
								</li>
								<li>
									<a href="#">4</a>
								</li>
								<li>
									<a href="#">Next</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const PageThree = () => {
	const tabOneRef = useRef();
	const tabTwoRef = useRef();

	const nextTabOne = () => {
		const tab_one = document.getElementsByClassName('tab_one');
		const tab_two = document.getElementsByClassName('tab_two');
		tabTwoRef.current.style.display = 'none';
		tabOneRef.current.style.display = 'block';
		tab_one[0].classList.add('active');
		tab_two[0].classList.remove('active');
	};
	const nextTabTwo = () => {
		const tab_two = document.getElementsByClassName('tab_two');
		const tab_one = document.getElementsByClassName('tab_one');
		tabOneRef.current.style.display = 'none';
		tabTwoRef.current.style.display = 'block';
		tab_one[0].classList.remove('active');
		tab_two[0].classList.add('active');
	};
	return (
		<>
			<div className="content-w">
				<div className="content-i">
					<div className="content-box">
						<div className="row pt-4">
							<div className="col-sm-12">
								<div className="element-wrapper">
									<div className="element-content">
										<div className="tablo-with-chart">
											<div className="row">
												<aside className="col-lg-3">
													<div className="element-box shadow-sm text-center p-3 mb-4">
														<div className="profile-thumb mt-3 mb-4">
															{' '}
															<img
																className="rounded-circle"
																src="img/avatar1.jpg"
																alt=""
															/>
															<div
																className="profile-thumb-edit bg-primary text-white"
																data-bs-toggle="tooltip"
																title=""
																data-bs-original-title="Change Profile Picture"
															>
																{' '}
																<i className="fas fa-camera position-absolute"></i>
															</div>
														</div>
														<div className="d-flex justify-content-center">
															<h4 className="text-9 fw-400">Max Smith</h4>
															<a href="#" className="mx-2">
																<span className="svg-icon svg-icon-1 svg-icon-primary">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="24px"
																		height="24px"
																		viewBox="0 0 24 24"
																	>
																		<path
																			d="M10.0813 3.7242C10.8849 2.16438 13.1151 2.16438 13.9187 3.7242V3.7242C14.4016 4.66147 15.4909 5.1127 16.4951 4.79139V4.79139C18.1663 4.25668 19.7433 5.83365 19.2086 7.50485V7.50485C18.8873 8.50905 19.3385 9.59842 20.2758 10.0813V10.0813C21.8356 10.8849 21.8356 13.1151 20.2758 13.9187V13.9187C19.3385 14.4016 18.8873 15.491 19.2086 16.4951V16.4951C19.7433 18.1663 18.1663 19.7433 16.4951 19.2086V19.2086C15.491 18.8873 14.4016 19.3385 13.9187 20.2758V20.2758C13.1151 21.8356 10.8849 21.8356 10.0813 20.2758V20.2758C9.59842 19.3385 8.50905 18.8873 7.50485 19.2086V19.2086C5.83365 19.7433 4.25668 18.1663 4.79139 16.4951V16.4951C5.1127 15.491 4.66147 14.4016 3.7242 13.9187V13.9187C2.16438 13.1151 2.16438 10.8849 3.7242 10.0813V10.0813C4.66147 9.59842 5.1127 8.50905 4.79139 7.50485V7.50485C4.25668 5.83365 5.83365 4.25668 7.50485 4.79139V4.79139C8.50905 5.1127 9.59842 4.66147 10.0813 3.7242V3.7242Z"
																			fill="#009A03"
																		></path>
																		<path
																			className="permanent"
																			d="M14.8563 9.1903C15.0606 8.94984 15.3771 8.9385 15.6175 9.14289C15.858 9.34728 15.8229 9.66433 15.6185 9.9048L11.863 14.6558C11.6554 14.9001 11.2876 14.9258 11.048 14.7128L8.47656 12.4271C8.24068 12.2174 8.21944 11.8563 8.42911 11.6204C8.63877 11.3845 8.99996 11.3633 9.23583 11.5729L11.3706 13.4705L14.8563 9.1903Z"
																			fill="white"
																		></path>
																	</svg>
																</span>
															</a>
														</div>
														<p className="text-3 fw-500 mb-2">
															Pharmacy Department
														</p>
														<p className="mb-2">
															<a
																href="settings-profile.html"
																className="text-5 text-light"
																data-bs-toggle="tooltip"
																title=""
																data-bs-original-title="Edit Profile"
																aria-label="Edit Profile"
															>
																<i className="fas fa-edit"></i>
															</a>
														</p>
													</div>

													<div className="element-box shadow-sm rounded text-center p-3 mb-4">
														<div className="text-17 text-light my-3">
															<i className="fas fa-wallet"></i>
														</div>
														<h3 className="text-9 fw-400">$2956.00</h3>
														<p className="mb-2 text-muted opacity-8">
															Available Balance
														</p>
														<hr className="mx-n3" />
														<div className="d-flex">
															<a
																href="withdraw-money.html"
																className="btn-link me-auto"
															>
																Withdraw
															</a>{' '}
															<a
																href="deposit-money.html"
																className="btn-link ms-auto"
															>
																Deposit
															</a>
														</div>
													</div>

													<div className="element-box shadow-sm rounded text-center p-3 mb-4">
														<div className="text-17 text-light my-3">
															<i className="fas fa-comments"></i>
														</div>
														<h3 className="text-5 fw-400 my-4">Need Help?</h3>
														<p className="text-muted opacity-8 mb-4">
															Have questions or concerns regrading your account?
															<br />
															Our experts are here to help!.
														</p>
														<div className="d-grid">
															<a href="#" className="btn btn-primary">
																Chate with Us
															</a>
														</div>
													</div>
												</aside>

												<div className="col-lg-9">
													<div className="os-tabs-w mx-4">
														<div className="os-tabs-controls">
															<ul className="nav nav-tabs upper">
																<li className="nav-item">
																	<a
																		aria-expanded="false"
																		className="nav-link tab_one"
																		data-toggle="tab"
																		href="#tab_overview"
																		onClick={() => nextTabOne()}
																	>
																		Profile
																	</a>
																</li>
																<li className="nav-item">
																	<a
																		aria-expanded="false"
																		className="nav-link tab_two"
																		data-toggle="tab"
																		href="#tab_sales"
																		onClick={() => nextTabTwo()}
																	>
																		PAYSLIPS
																	</a>
																</li>
																{/* <li className="nav-item">
                                                                    <a aria-expanded="false" className="nav-link" data-toggle="tab" href="#tab_sales">DEDUCTIONS</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a aria-expanded="true" className="nav-link" data-toggle="tab" href="#tab_sales">APPRAISALS</a>
                                                                </li> */}
															</ul>
														</div>
													</div>
													<div ref={tabOneRef} style={{ display: '' }}>
														<TabOne />
													</div>
													<div ref={tabTwoRef} style={{ display: 'none' }}>
														<TabTwo />
													</div>
												</div>
												<div></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageThree;
