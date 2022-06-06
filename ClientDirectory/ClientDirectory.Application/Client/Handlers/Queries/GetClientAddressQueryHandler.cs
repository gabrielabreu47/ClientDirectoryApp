using AutoMapper;
using ClientDirectory.Application.Client.Dtos;
using ClientDirectory.Application.Client.Queries;
using ClientDirectory.Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ClientDirectory.Application.Client.Handlers.Queries
{
    public class GetClientAddressQueryHandler : IRequestHandler<GetClientAddressQuery, AddressDto>
    {
        private readonly IClientAddressCrudService _clientAddressCrudService;
        private readonly IMapper _mapper;

        public GetClientAddressQueryHandler(IClientAddressCrudService clientAddressCrudService, IMapper mapper)
        {
            _clientAddressCrudService = clientAddressCrudService;
            _mapper = mapper;
        }
        public async Task<AddressDto> Handle(GetClientAddressQuery request, CancellationToken cancellationToken)
        {
            var clientAddress = await _clientAddressCrudService.Query()
                .Where(x => x.ClientId == request.AddressId)
                .FirstOrDefaultAsync(cancellationToken: cancellationToken);

            if (clientAddress == null) throw new Exception($"Address with id {request.AddressId} was not found");

            var addressDto = _mapper.Map<AddressDto>(clientAddress);

            return addressDto;
        }
    }
}
