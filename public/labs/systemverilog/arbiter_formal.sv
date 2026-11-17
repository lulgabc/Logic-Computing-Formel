// Formal wrapper: assert mutual exclusion in every reachable state.
module arbiter_formal (
  input  logic       clk,
  input  logic       rst_n,
  input  logic [1:0] req
);

  logic [1:0] gnt;

  initial assume (!rst_n);

  arbiter dut (
    .clk(clk),
    .rst_n(rst_n),
    .req(req),
    .gnt(gnt)
  );

  always_ff @(posedge clk) begin
    if (rst_n) begin
      assert (gnt != 2'b11);
    end
  end

endmodule
