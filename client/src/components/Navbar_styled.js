import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
    position: absolute;
    width: 300px;
    height: 950px;
    left: 0px;
    top: 130px;
    background-color: #000000;

`;

export const NavMenu = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export const NavLink = styled(Link)`
    text-decoration: none;

    font-family: Myriad Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: #FFFFFF;
    
    padding: 25px 0px;

    &.active {
        background-color: #8DC442;
    }
`;