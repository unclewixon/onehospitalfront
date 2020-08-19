import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import waiting from '../../assets/images/waiting.gif';
import { request } from '../../services/utilities';
import { notifySuccess, notifyError } from './../../services/notify';
// import '../../assets/profile.css'

const PayslipModal = ({ showModal, onModalClick, patient, activeRequest }) => {
	return (
		<Modal
			className="onboarding-modal"
			show={showModal}
			// size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			onHide={onModalClick}>
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body>
				<div className="row">
					{/*profile left part*/}
					<div className="my_account one-fourth">
						<figure>
							<img src="img/avatar8.jpg" alt="" />
						</figure>
						<div className="container">
							<h2>Anabelle Q.</h2>
						</div>
					</div>
					{/*//profile left part*/}
					<div className="three-fourth">
						<nav className="tabs">
							<ul>
								<li className="active">
									<a href="#about" title="About me">
										About me
									</a>
								</li>
								<li>
									<a href="#recipes" title="My recipes">
										My recipes
									</a>
								</li>
								<li>
									<a href="#favorites" title="My favorites">
										My favorites
									</a>
								</li>
								<li>
									<a href="#posts" title="My posts">
										My posts
									</a>
								</li>
							</ul>
						</nav>
						{/*about*/}
						<div className="tab-content" id="about" style={{}}>
							<div className="row">
								<dl className="basic two-third">
									<dt>Name</dt>
									<dd>Anabelle Q.</dd>
									<dt>Favorite cusine</dt>
									<dd>Thai, Mexican</dd>
									<dt>Favorite appliances</dt>
									<dd>Blender, sharp knife</dd>
									<dt>Favorite spices</dt>
									<dd>Chilli, Oregano, Basil</dd>
									<dt>Recipes submitted</dt>
									<dd>9</dd>
									<dt>Posts submitted</dt>
									<dd>9</dd>
								</dl>
								<div className="one-third">
									<ul className="boxed gold">
										<li className="light">
											<a href="#" title="Best recipe">
												<i className="icon icon-themeenergy_crown" />{' '}
												<span>Had a best recipe</span>
											</a>
										</li>
										<li className="medium">
											<a href="#" title="Was featured">
												<i className="icon icon-themeenergy_top-rankings" />{' '}
												<span>Was featured</span>
											</a>
										</li>
										<li className="dark">
											<a href="#" title="Added a first recipe">
												<i className="icon  icon-themeenergy_medal-first-place" />{' '}
												<span>Added a first recipe</span>
											</a>
										</li>
										<li className="medium">
											<a href="#" title="Added 10-20 recipes">
												<i className="icon icon-themeenergy_medal-8" />{' '}
												<span>Added 10-20 recipes</span>
											</a>
										</li>
										<li className="dark">
											<a href="recipes.html" title="Events">
												<i className="icon icon-themeenergy_pencil" />{' '}
												<span>Wrote a blog post</span>
											</a>
										</li>
										<li className="light">
											<a href="recipes.html" title="Fish">
												<i className="icon icon-themeenergy_chat-bubbles" />{' '}
												<span>Wrote a comment</span>
											</a>
										</li>
										<li className="dark">
											<a href="recipes.html" title="Fish">
												<i className="icon icon-themeenergy_cup2" />{' '}
												<span>Won a contest</span>
											</a>
										</li>
										<li className="light">
											<a href="recipes.html" title="Healthy">
												<i className="icon icon-themeenergy_share3" />{' '}
												<span>Shared a recipe</span>
											</a>
										</li>
										<li className="medium">
											<a href="#" title="Was featured">
												<i className="icon icon-themeenergy_top-rankings" />{' '}
												<span>Was featured</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						{/*//about*/}
						{/*my recipes*/}
						<div
							className="tab-content"
							id="recipes"
							style={{ display: 'none' }}>
							<div className="entries row">
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img6.jpg" alt="" />
										<figcaption>
											<a href="recipe.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View recipe</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="recipe.html">
												Thai fried rice with fruit and vegetables
											</a>
										</h2>
										<div className="actions">
											<div>
												<div className="difficulty">
													<i className="ico i-medium" />
													<a href="#">medium</a>
												</div>
												<div className="likes">
													<i className="fa fa-heart" aria-hidden="true" />
													<a href="#">10</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="recipe.html#comments">27</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/*item*/}
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img5.jpg" alt="" />
										<figcaption>
											<a href="recipe.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View recipe</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="recipe.html">
												Spicy Morroccan prawns with cherry tomatoes
											</a>
										</h2>
										<div className="actions">
											<div>
												<div className="difficulty">
													<i className="ico i-hard" />
													<a href="#">hard</a>
												</div>
												<div className="likes">
													<i className="fa fa-heart" aria-hidden="true" />
													<a href="#">10</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="recipe.html#comments">27</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/*item*/}
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img8.jpg" alt="" />
										<figcaption>
											<a href="recipe.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View recipe</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="recipe.html">Super easy blueberry cheesecake</a>
										</h2>
										<div className="actions">
											<div>
												<div className="difficulty">
													<i className="ico i-easy" />
													<a href="#">easy</a>
												</div>
												<div className="likes">
													<i className="fa fa-heart" aria-hidden="true" />
													<a href="#">10</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="recipe.html#comments">27</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/*item*/}
							</div>
						</div>
						{/*//my recipes*/}
						{/*my favorites*/}
						<div
							className="tab-content"
							id="favorites"
							style={{ display: 'none' }}>
							<div className="entries row">
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img6.jpg" alt="" />
										<figcaption>
											<a href="recipe.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View recipe</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="recipe.html">
												Thai fried rice with fruit and vegetables
											</a>
										</h2>
										<div className="actions">
											<div>
												<div className="difficulty">
													<i className="ico i-medium" />
													<a href="#">medium</a>
												</div>
												<div className="likes">
													<i className="fa fa-heart" aria-hidden="true" />
													<a href="#">10</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="recipe.html#comments">27</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/*item*/}
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img5.jpg" alt="" />
										<figcaption>
											<a href="recipe.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View recipe</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="recipe.html">
												Spicy Morroccan prawns with cherry tomatoes
											</a>
										</h2>
										<div className="actions">
											<div>
												<div className="difficulty">
													<i className="ico i-hard" />
													<a href="#">hard</a>
												</div>
												<div className="likes">
													<i className="fa fa-heart" aria-hidden="true" />
													<a href="#">10</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="recipe.html#comments">27</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/*item*/}
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img8.jpg" alt="" />
										<figcaption>
											<a href="recipe.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View recipe</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="recipe.html">Super easy blueberry cheesecake</a>
										</h2>
										<div className="actions">
											<div>
												<div className="difficulty">
													<i className="ico i-easy" />
													<a href="#">easy</a>
												</div>
												<div className="likes">
													<i className="fa fa-heart" aria-hidden="true" />
													<a href="#">10</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="recipe.html#comments">27</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/*item*/}
							</div>
						</div>
						{/*//my favorites*/}
						{/*my posts*/}
						<div className="tab-content" id="posts" style={{ display: 'none' }}>
							{/*entries*/}
							<div className="entries row">
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img12.jpg" alt="" />
										<figcaption>
											<a href="blog_single.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View post</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="blog_single.html">Barbeque party</a>
										</h2>
										<div className="actions">
											<div>
												<div className="date">
													<i className="fa fa-calendar" aria-hidden="true" />
													<a href="#">22 Dec 2014</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="blog_single.html#comments">27</a>
												</div>
											</div>
										</div>
										<div className="excerpt">
											<p>
												Lorem ipsum dolor sit amet, consectetuer adipiscing
												elit, sed diam nonummy nibh euismod. Lorem ipsum dolor
												sit amet . . .{' '}
											</p>
										</div>
									</div>
								</div>
								{/*item*/}
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img11.jpg" alt="" />
										<figcaption>
											<a href="blog_single.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View post</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="blog_single.html">How to make sushi</a>
										</h2>
										<div className="actions">
											<div>
												<div className="date">
													<i className="fa fa-calendar" aria-hidden="true" />
													<a href="#">22 Dec 2014</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="blog_single.html#comments">27</a>
												</div>
											</div>
										</div>
										<div className="excerpt">
											<p>
												Lorem ipsum dolor sit amet, consectetuer adipiscing
												elit, sed diam nonummy nibh euismod. Lorem ipsum dolor
												sit amet . . .{' '}
											</p>
										</div>
									</div>
								</div>
								{/*item*/}
								{/*item*/}
								<div className="entry one-third">
									<figure>
										<img src="images/img10.jpg" alt="" />
										<figcaption>
											<a href="blog_single.html">
												<i className="icon icon-themeenergy_eye2" />{' '}
												<span>View post</span>
											</a>
										</figcaption>
									</figure>
									<div className="container">
										<h2>
											<a href="blog_single.html">Make your own bread</a>
										</h2>
										<div className="actions">
											<div>
												<div className="date">
													<i className="fa fa-calendar" aria-hidden="true" />
													<a href="#">22 Dec 2014</a>
												</div>
												<div className="comments">
													<i className="fa fa-comment" aria-hidden="true" />
													<a href="blog_single.html#comments">27</a>
												</div>
											</div>
										</div>
										<div className="excerpt">
											<p>
												Lorem ipsum dolor sit amet, consectetuer adipiscing
												elit, sed diam nonummy nibh euismod. Lorem ipsum dolor
												sit amet . . .{' '}
											</p>
										</div>
									</div>
								</div>
								{/*item*/}
							</div>
							{/*//entries*/}
						</div>
						{/*//my posts*/}
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};
export default PayslipModal;
