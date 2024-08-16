import { ethers } from "hardhat";

async function main() {
  // Lấy ContractFactory cho LockModule
  const LockModule = await ethers.getContractFactory("Lock");

  // Địa chỉ của hợp đồng đã triển khai
  const lockModuleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  // Tạo đối tượng hợp đồng từ địa chỉ đã triển khai
  const lockModule = LockModule.attach(lockModuleAddress);

  // Gọi một hàm của hợp đồng (giả sử hàm là `lock`)
  const result = await lockModule.getAddress;
  console.log("Lock result:", result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
