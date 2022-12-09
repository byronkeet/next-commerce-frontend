import React, { Fragment } from 'react';
import { Product, FooterBanner, HeroBanner } from '../components';

const Home = () => {
	return (
		<Fragment>
			HeroBanner

			<div className='products-heading'>
				<h2>Best Selling Products</h2>
				<p>Speakers of many variations</p>
			</div>

			<div className='products-container'>
				{['prodcut 1', 'product 2'].map((product) => (
					product
				))}
			</div>

			Footer
		</Fragment>
	)
}

export default Home;