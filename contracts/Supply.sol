// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Supply {
    struct Product {
        uint256 id;
        string name;
        address Manufacturer;
    }
    struct Next {
        address next;
        bool DelStatus;
    }
    uint[] private productID;
    mapping(uint256 => Product) public products;
    mapping(uint256 => Next[]) public Link;
    event Added(uint256 id);
    event Addednext(uint256 id, address nextAddress);
    event InvalidAcceptor();
    event Delivered(uint256 id, address current, address prev, address owner);

    function addProduct(uint256 id, string memory Pname) public {
        products[id] = Product(id, Pname, msg.sender);
        Link[id].push(Next(msg.sender, true));
        productID.push(id);
        emit Added(id);
    }

    function showProducts() public view returns (Product[] memory productList) {
        uint256 count = 0;
        for (uint256 i = 0; i < productID.length; i++) {
            uint256 id = productID[i];
            if (isOwnerOrInChain(id, msg.sender)) {
                count++;
            }
        }
        Product[] memory result = new Product[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < productID.length; i++) {
            uint256 id = productID[i];
            if (isOwnerOrInChain(id, msg.sender)) {
                result[index] = products[id];
                index++;
            }
        }

        return result;
    }

    function isOwnerOrInChain(
        uint256 id,
        address user
    ) internal view returns (bool) {
        if (products[id].Manufacturer == user) {
            return true;
        }
        for (uint256 i = 0; i < Link[id].length; i++) {
            if (Link[id][i].next == user) {
                return true;
            }
        }

        return false;
    }

    function DeliverNext(uint256 id, address nextAddress) public {
        require(
            Link[id][Link[id].length - 1].next == msg.sender,
            "Not authorized to deliver"
        );
        require(
            Link[id][Link[id].length - 1].DelStatus == true,
            "Not delivered"
        );
        for (uint i = 0; i < Link[id].length; i++) {
            if (nextAddress == Link[id][i].next) {
                revert("Already added");
            }
        }
        Link[id].push(Next(nextAddress, false));
        emit Addednext(id, nextAddress);
    }

    function AcceptDelivery(uint256 id) public {
        uint256 lastIndex = Link[id].length - 1;
        require(
            Link[id][lastIndex].next == msg.sender,
            "Not the expected acceptor"
        );
        require(
            Link[id][lastIndex].DelStatus == false,
            "Delivery already accepted"
        );
        Link[id][lastIndex].DelStatus = true;
        address prev = Link[id][lastIndex - 1].next;
        address owner = Link[id][0].next; // Manufacturer
        emit Delivered(id, msg.sender, prev, owner);
    }

    function Track(uint256 id) public view returns (Next[] memory track) {
        bool verified;
        for (uint256 i = 0; i < Link[id].length; i++) {
            if (Link[id][i].next == msg.sender) {
                verified = true;
                break;
            }
        }
        if (verified == true) {
            return Link[id];
        }
    }

    function ProductDetails(
        uint256 id
    ) public view returns (Product memory prod) {
        bool verified;
        for (uint256 i = 0; i < Link[id].length; i++) {
            if (Link[id][i].next == msg.sender) {
                verified = true;
                break;
            }
        }
        if (verified == true) {
            return products[id];
        }
    }

    function verify(uint256 id) public view returns (Next[] memory, bool) {
        bool status;
        for (uint256 i = 0; i < Link[id].length; i++) {
            if (
                (Link[id][i].next != address(0)) &&
                (Link[id][i].DelStatus == true)
            ) {
                status = true;
                break;
            }
        }
        return (Link[id], status);
    }
}
